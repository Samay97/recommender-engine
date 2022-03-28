from flask import Flask
from src.contendBased import ContendBasedRecommendation

app = Flask(__name__)

@app.route("/")
def get_recommendation():
    recommender = ContendBasedRecommendation()
    data = recommender.get_recommendations('SAMSUNG 32" UJ590 Widescreen UHD LED Monitor - LU32J590UQNXZA')
    return data.to_csv()
