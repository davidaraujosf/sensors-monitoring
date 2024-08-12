from locust import HttpUser, task, between
import json

class GraphQLMutations(HttpUser):  
    @task
    def create_sensor(self):
        query = """
        mutation CreateSensor {
          createSensor(input: {equipmentId: "EQ-12492", timestamp: "2023-02-12T01:30:00.000-05:00", value: 100}) {
            equipmentId
            timestamp
            value
          }
        }
        """
        self.client.get("/graph", json={"query": query})

    @task 
    def update_sensor(self):
        query = """
        mutation UpdateSensor {
          updateSensor(id: "1", input: {equipmentId: "EQ-12492", timestamp: "2023-02-12T01:30:00.000-05:00", value: 200}) {
            id
            equipmentId
            timestamp
            value
          }
        }
        """
        self.client.get("/graph", json={"query": query})

    @task
    def delete_sensor(self):
        query = """
        mutation DeleteSensor {
          deleteSensor(id: "1") {
            id
          }
        }
        """
        self.client.get("/graph", json={"query": query})


