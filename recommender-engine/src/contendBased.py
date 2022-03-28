from sqlite3 import DatabaseError
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from pymongo.collection import Collection
from bson.objectid import ObjectId

from .database import get_mongo_client



class ContendBasedRecommendation():

    product_collection: Collection = None
    category_collection: Collection = None
    dataframe: pd.DataFrame = None
    sim_vector = None

    def __init__(self) -> None:
        client = get_mongo_client()
        self.product_collection = client.recommender.product
        self.category_collection = client.recommender.category
        self.convert_products_collection_to_df()

        self.create_soup_and_overview()
        self.vertorize()

    def convert_products_collection_to_df(self) -> None:
        df_product = pd.DataFrame(list(self.product_collection.find()))
        df_category = pd.DataFrame(list(self.category_collection.find()))

        for i, row in df_product.iterrows():
            category = df_category.loc[df_category['_id'] == row['category']]
            if category is not None:
                df_product.at[i, 'category'] = category['name']
        self.dataframe = df_product
    
    def create_soup_and_overview(self) -> None:
        def create_soup(x):
            # TODO: description (need parsing, currently its html code)
            #  + '' + ''.join(x['description']) + '' 
            return ''.join(x['name']) + '' + ''.join(x['category']) + '' + ''.join(str(x['price']))

        # TODO fill nan if collum is not needed
        # self.dataframe['overview'] = self.dataframe['overview'].fillna('')
        self.dataframe['soup'] = self.dataframe.apply(create_soup, axis=1)

    def vertorize(self) -> None:
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(self.dataframe['soup'])
        self.sim_vector = linear_kernel(tfidf_matrix, tfidf_matrix)
    
    def get_recommendations(self, product_id, recommendations_count=10):
        if self.sim_vector is None:
            raise ValueError('sim_vector is empty, should calculate sim. first')

        indices = pd.Series(self.dataframe.index, index=self.dataframe['_id']).drop_duplicates()
        idx = indices[ObjectId(product_id)]

        sim_scores = list(enumerate(self.sim_vector[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        if recommendations_count > len(sim_scores):
            sim_scores = sim_scores[1:]
        else:
            sim_scores = sim_scores[1:recommendations_count+1]

        result_df = pd.DataFrame()
        result_df['_id'] = ''
        result_df['name'] = ''
        result_df['score'] = ''
        for movie_idices, sim_score in sim_scores:
            name = self.dataframe['name'].iloc[movie_idices]
            product_id = self.dataframe['_id'].iloc[movie_idices]
            data = {'_id': product_id,'name': name, 'score': sim_score}
            result_df = result_df.append(data, ignore_index=True)

        return result_df
