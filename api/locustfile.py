from locust import HttpUser, between
from load_tests.run_mutations_tests import GraphQLMutations
from load_tests.run_queries_tests import GraphQLQueries

class GraphQLUser(HttpUser):
    tasks = [GraphQLMutations, GraphQLQueries]
    wait_time = between(1, 5)