import { CREATE_SENSOR_MUTATION } from '@/api/sensor';

export const SENSOR_INPUT_FORM_MOCK_DATE = '2024-08-05T20:50';

export const SENSOR_INPUT_FORM_MOCKS = [
  {
    request: {
      query: CREATE_SENSOR_MUTATION,
      variables: {
        equipmentId: 'test-equipment',
        timestamp: SENSOR_INPUT_FORM_MOCK_DATE,
        value: 10.5,
      },
    },
    result: {
      data: {
        createSensor: {
          equipmentId: 'test-equipment',
          timestamp: SENSOR_INPUT_FORM_MOCK_DATE,
          value: 10.5,
        },
      },
    },
  },
];
