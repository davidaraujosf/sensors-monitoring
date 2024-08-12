export interface Sensor {
  equipmentId: string;
  timestamp: string;
  value: number;
}

export interface SensorResponse {
  sensors: Sensor[];
}

export interface SensorAverage {
  equipmentId: string;
  averageValue: number;
}

export interface SensorAverageResponse {
  sensorsAverage: SensorAverage[];
}

export interface SensorSomatory {
  equipmentId: string;
  somatoryValue: number;
  count: number;
  averageValue: number;
}

export interface SensorSomatoryResponse {
  sensorsSomatory: SensorSomatory[];
}
