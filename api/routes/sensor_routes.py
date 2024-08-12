from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from datetime import datetime
from config.db import conn
from models.sensor_model import Sensor
import chardet
from io import StringIO
import csv

router = APIRouter()

def detect_delimiter(file_content: str):
    sniffer = csv.Sniffer()
    try:
        dialect = sniffer.sniff(file_content)
        return dialect.delimiter
    except csv.Error:
        return ','  

@router.post("/upload-csv/")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File format not supported.")

    contents = await file.read()
    result = chardet.detect(contents)
    file_encoding = result['encoding'] if result['encoding'] is not None else 'utf-8'

    try:
        decoded_contents = contents.decode(file_encoding)

        delimiter = detect_delimiter(decoded_contents)

        df = pd.read_csv(StringIO(decoded_contents), delimiter=delimiter)

        df.columns = df.columns.str.strip()

        required_columns = ['equipmentId', 'timestamp', 'value']
        if not all(column in df.columns for column in required_columns):
            raise HTTPException(status_code=400, detail=f"Missing required columns: {', '.join(required_columns)}")

        sensors = []
        for index, row in df.iterrows():
            try:
                timestamp_dt = datetime.strptime(row['timestamp'].replace(" ", ""), "%Y-%m-%dT%H:%M:%S.%f%z")
                sensor = Sensor(
                    equipmentId=row['equipmentId'],
                    timestamp= timestamp_dt,
                    value=float(row['value'])
                )
                sensors.append(sensor)
                conn.local.sensor.insert_one(sensor.model_dump())
            except Exception as error:
                raise HTTPException(status_code=400, detail=f"Error processing row {index}: {str(error)}")

    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="Could not decode file content.")
    except pd.errors.ParserError:
        raise HTTPException(status_code=400, detail="Error parsing the CSV file.")

    return {"detail": "File processed successfully", "sensors": len(sensors)}