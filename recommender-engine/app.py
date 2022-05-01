from flask import Flask, request
from src.contentBased import ContentBasedRecommendation
from src.collaborative import CollaborativeRecommendation

app = Flask(__name__)
cb_recommender: ContentBasedRecommendation = None

def startup():
    global cb_recommender
    cb_recommender = ContentBasedRecommendation()
    col_recommender = CollaborativeRecommendation()


@app.route("/<productid>/recommendation/contendbased", methods=['GET'])
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


@app.route("/<productid>/recommendation/collaborative", methods=['GET'])
def get_recommendation_collaborative(productid):
    recommendations_count = request.args.get('count', default = 1, type = int)
    
    data = cb_recommender.get_recommendations(productid, recommendations_count)
    
    
    response = app.response_class(
        response=data.to_json(orient='records', default_handler=str),
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ == "__main__":
    startup()
    #app.run(debug=True, host='0.0.0.0', port=5000)
