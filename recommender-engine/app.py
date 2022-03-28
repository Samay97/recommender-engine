from flask import Flask, request
from src.contendBased import ContendBasedRecommendation

app = Flask(__name__)
cb_recommender: ContendBasedRecommendation = None

def startup():
    global cb_recommender
    cb_recommender = ContendBasedRecommendation()

@app.route("/<productid>/recommendation/contendbased")
def get_recommendation(productid):
    recommendations_count = request.args.get('count', default = 1, type = int)
    data = cb_recommender.get_recommendations(productid, recommendations_count)
    response = app.response_class(
        response=data.to_json(orient='records', default_handler=str),
        status=200,
        mimetype='application/json'
    )
    return response
    # TODO remove when documentation is done
    #return data.to_csv()

startup()

