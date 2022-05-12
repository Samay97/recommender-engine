from flask import Flask, request
from src.contentBased import ContentBasedRecommendation
from src.collaborative import CollaborativeRecommendation
from src.hybrid import HybridRecommendation

app = Flask(__name__)
cb_recommender: ContentBasedRecommendation = None
col_recommender: CollaborativeRecommendation = None
hybrid_recommender: HybridRecommendation = None

def startup():
    global cb_recommender
    global col_recommender
    global hybrid_recommender
    cb_recommender = ContentBasedRecommendation()
    col_recommender = CollaborativeRecommendation()
    hybrid_recommender = HybridRecommendation()

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
    recommendation_matching_value = request.args.get('matching_value', default = 0.8, type = int)
    
    data = col_recommender.get_recommendations(productid, recommendation_matching_value)    
    
    response = app.response_class(
        response=data.to_json(orient='records', default_handler=str),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route("/<productid>/recommendation/hybrid", methods=['GET'])
def get_recommendation_hybrid(productid):   
    recommendations_count = request.args.get('count', default = 5, type = int)
    recommendation_matching_value = request.args.get('matching_value', default = 0.8, type = int)

    data_cb = cb_recommender.get_recommendations(productid, recommendations_count)
    data_col = col_recommender.get_recommendations(productid, recommendation_matching_value)    
    data = hybrid_recommender.get_recommendations(data_cb, data_col)
    
    response = app.response_class(
        response=data.to_json(orient='records', default_handler=str),
        status=200,
        mimetype='application/json'
    )
    return response

if __name__ == "__main__":
    startup()
    app.run(debug=True, host='0.0.0.0', port=5000)

    # TODO´s Samuel bis Manu Urlaub vorbei ist:
    # 1. API das produkte über collaborative gefuinden werden könne     (DONE)
    # 2. Anpassbares Hybrid                                             (DONE)
    # 3. Benny deployment machen                                        ()
    # 4. Form damit nutzer angeben können wie gut die vorhersage war    (DONE)
    # 5. Sortierung der Erbenisse inherlab einer Category               ()
    # 6. Anpassen der produkt ansicht                                   ()
