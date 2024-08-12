from datetime import datetime, timedelta
from config.db import conn

def get_period_dates(period):
    now = datetime.now()
    if period == "24h":
        return now - timedelta(hours=24)
    elif period == "48h":
        return now - timedelta(hours=48)
    elif period == "1w":
        return now - timedelta(weeks=1)
    elif period == "1m":
        return now - timedelta(days=30)
    return now

def get_sensors():
    sensors = list(conn.local.sensor.find({}))
    return sensors

def get_sensor_by_id(id):
    return list(conn.local.sensor.find_one({"_id": id}))

def get_sensor_averages(period):
    query = {}
    if period and period != 'all':
      period_start = get_period_dates(period)
      query["timestamp"] = {"$gte": period_start, "$lte": datetime.now()}

    sensors = list(conn.local.sensor.find(query))

    averages = {}
    for sensor in sensors:
        equipment_id = sensor['equipmentId']
        if equipment_id not in averages:
            averages[equipment_id] = []
        averages[equipment_id].append(sensor['value'])

    average_values = [
        {
            "equipmentId": equipment_id,
            "averageValue": sum(values) / len(values)
        }
        for equipment_id, values in averages.items()
    ]

    return average_values

def get_sensor_somatory(period):
    query = {}
    if period and period != 'all':
      period_start = get_period_dates(period)
      query["timestamp"] = {"$gte": period_start, "$lte": datetime.now()}

    sensors = list(conn.local.sensor.find(query))

    somatory = {}
    for sensor in sensors:
        equipment_id = sensor['equipmentId']
        if equipment_id not in somatory:
            somatory[equipment_id] = []
        somatory[equipment_id].append(sensor['value'])

    somatory_values = [
        {
            "equipmentId": equipment_id,
            "somatoryValue": sum(values),
            "count": len(values),
            "averageValue": sum(values) / len(values)
        }
        for equipment_id, values in somatory.items()
    ]

    return somatory_values
