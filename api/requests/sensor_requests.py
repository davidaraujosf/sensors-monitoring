import strawberry
from typing import List, Optional
from datetime import datetime
from models.sensor_model import SensorType, SensorAverageType, SensorSomatoryType, SensorSomatory ,SensorAverage , Sensor
from services.sensor_service import get_sensor_averages, get_sensors, get_sensor_somatory
from config.db import conn
from bson import ObjectId

@strawberry.type
class Query:
    @strawberry.field
    def sensors(self) -> List[SensorType]:
        sensors = get_sensors()
        models = [Sensor(**item) for item in sensors]
        return [SensorType.from_pydantic(sensor) for sensor in models] 
    
    @strawberry.field
    def sensors_average(self, period: Optional[str]) -> List[SensorAverageType]:
        sensor_averages = get_sensor_averages(period)
        models = [SensorAverage(**item) for item in sensor_averages]
        return [SensorAverageType.from_pydantic(sensor) for sensor in models] 
    
    @strawberry.field
    def sensors_somatory(self, period: Optional[str]) -> List[SensorSomatoryType]:
        sensor_averages = get_sensor_somatory(period)
        models = [SensorSomatory(**item) for item in sensor_averages]
        return [SensorSomatoryType.from_pydantic(sensor) for sensor in models] 
    
@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_sensor(self, equipmentId: str, timestamp: datetime, value: float) -> SensorType:
        sensor = Sensor(equipmentId=equipmentId, timestamp=timestamp, value=value)
        conn.local.sensor.insert_one(sensor.model_dump())
        return SensorType.from_pydantic(sensor)

    @strawberry.mutation
    def update_sensor(self, id: str, equipment_id: str, timestamp: datetime, value: float) -> SensorType:
        result = conn.local.sensor.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": {"equipmentId": equipment_id, "timestamp": timestamp, "value": value}},
            return_document=True
        )
        if result is None:
            raise Exception("Sensor not found")
        return SensorType.from_pydantic(result)

    @strawberry.mutation
    def delete_sensor(self, id: str) -> bool:
        result = conn.local.sensor.delete_one({"_id": ObjectId(id)})
        return result.deleted_count > 0

schema = strawberry.Schema(query=Query, mutation=Mutation)    