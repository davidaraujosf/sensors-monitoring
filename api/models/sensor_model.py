import strawberry
from pydantic import BaseModel
from datetime import datetime

class Sensor(BaseModel):
  equipmentId: str
  timestamp: datetime
  value: float

class SensorAverage(BaseModel):
  equipmentId: str
  averageValue: float

class SensorSomatory(BaseModel):
  equipmentId: str
  somatoryValue: float
  count: int = 0
  averageValue: float = 0.0

@strawberry.experimental.pydantic.type(model=Sensor, all_fields=True)
class SensorType:
  pass

@strawberry.experimental.pydantic.type(model=SensorAverage, all_fields=True)
class SensorAverageType:
  pass

@strawberry.experimental.pydantic.type(model=SensorSomatory, all_fields=True)
class SensorSomatoryType:
  pass