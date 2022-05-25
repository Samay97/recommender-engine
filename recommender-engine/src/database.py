import os
from pymongo import MongoClient

""""""
CLIENT = None

def get_mongo_client():
    """
    :return: MongoClient
    """
    global CLIENT 
    #client = MongoClient('mongodb://{}:{}@{}:{}/{}'.format(
    #        'myuser',
    #        'password',
    #       'localhost',
    #        27017,
    #        'recommender')
    #    )
    #CLIENT = client
    #return CLIENT
    if os.environ.get('MONGO_HOST') is None:
        raise ValueError('Missing env var: MONGO_HOST')

    if os.environ.get('MONGO_PORT') is None:
        raise ValueError('Missing env var: MONGO_PORT')
    
    if os.environ.get('MONGO_DATABASE') is None:
        raise ValueError('Missing env var: MONGO_DATABASE')
    
    if CLIENT is None:
        client = MongoClient('mongodb://{}:{}@{}:{}/{}'.format(
            os.environ.get('MONGO_DATABASE_USER'),
            os.environ.get('MONGO_DATABASE_PASSWORD'),
            os.environ.get('MONGO_HOST'),
            int(os.environ.get('MONGO_PORT')),
            os.environ.get('MONGO_DATABASE'))
        )
        CLIENT = client

    return CLIENT
