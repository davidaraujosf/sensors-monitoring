from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
from requests.sensor_requests import schema
from routes.sensor_routes import router as sensor_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)
graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graph")
app.include_router(sensor_router)

