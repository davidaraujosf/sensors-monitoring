import {
  GET_SENSOR_AVERAGES_QUERY,
  GET_SENSOR_SOMATORY_QUERY,
} from '@/api/sensor';

const mockAveragesData = {
  sensorsAverage: [
    { equipmentId: 'equip1', averageValue: 10 },
    { equipmentId: 'equip2', averageValue: 20 },
  ],
};

const mockSomatoryData = {
  sensorsSomatory: [
    { equipmentId: 'equip1', count: 5, somatoryValue: 50, averageValue: 10 },
    { equipmentId: 'equip2', count: 5, somatoryValue: 100, averageValue: 20 },
  ],
};

export const DASHBOARD_TEST_MOCKS = [
  {
    request: {
      query: GET_SENSOR_AVERAGES_QUERY,
      variables: { period: '24h' },
    },
    result: {
      data: mockAveragesData,
    },
  },
  {
    request: {
      query: GET_SENSOR_SOMATORY_QUERY,
      variables: { period: '24h' },
    },
    result: {
      data: mockSomatoryData,
    },
  },
  {
    request: {
      query: GET_SENSOR_AVERAGES_QUERY,
      variables: { period: '48h' },
    },
    result: {
      data: mockAveragesData,
    },
  },
  {
    request: {
      query: GET_SENSOR_SOMATORY_QUERY,
      variables: { period: '48h' },
    },
    result: {
      data: mockSomatoryData,
    },
  },
];

export const DASHBOARD_TEST_MOCKS_ERROR = [
  {
    request: {
      query: GET_SENSOR_AVERAGES_QUERY,
      variables: { period: '24h' },
    },
    error: new Error('An error occurred'),
  },
  {
    request: {
      query: GET_SENSOR_SOMATORY_QUERY,
      variables: { period: '24h' },
    },
    result: {
      data: mockSomatoryData,
    },
  },
];
