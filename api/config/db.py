import os
from pymongo import MongoClient

conn = MongoClient(os.getenv('MONGO_URI'))