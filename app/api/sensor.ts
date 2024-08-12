import { gql } from '@apollo/client';

export const GET_SENSORS_QUERY = gql`
  query GetSensors {
    sensors {
      equipmentId
      timestamp
      value
    }
  }
`;

export const GET_SENSOR_AVERAGES_QUERY = gql`
  query GetSensorAverages($period: String) {
    sensorsAverage(period: $period) {
      equipmentId
      averageValue
    }
  }
`;

export const GET_SENSOR_SOMATORY_QUERY = gql`
  query GetSensorSomatory($period: String) {
    sensorsSomatory(period: $period) {
      equipmentId
      somatoryValue
      count
      averageValue
    }
  }
`;

export const CREATE_SENSOR_MUTATION = gql`
  mutation CreateSensor(
    $equipmentId: String!
    $timestamp: DateTime!
    $value: Float!
  ) {
    createSensor(
      equipmentId: $equipmentId
      timestamp: $timestamp
      value: $value
    ) {
      equipmentId
      timestamp
      value
    }
  }
`;
