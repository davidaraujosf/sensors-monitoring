from locust import HttpUser, task, between
import json

class GraphQLQueries(HttpUser):
    @task
    def get_sensors(self):
        query = """
        query GetSensors {
          sensors {
            equipmentId
            timestamp
            value
          }
        }
        """
        self.client.get("/graph", json={"query": query})

    @task
    def get_sensor_averages(self):
        query = """
        query GetSensorsAverage {
          sensorAverages(period: "24h") {
            equipmentId
            averageValue
          }
        }
        """
        self.client.get("/graph", json={"query": query})

    @task
    def get_sensor_somatory(self):
        query = """
        query GetSensorsSomatory {
          sensorSomatory(period: "24h") {
            equipmentId
            somatoryValue
            count
            averageValue
          }
        }
        """
        self.client.get("/graph", json={"query": query})
