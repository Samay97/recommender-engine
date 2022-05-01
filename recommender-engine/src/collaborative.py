import numpy as np
import pandas as pd

from pandas import DataFrame

from pymongo.collection import Collection
from sklearn.decomposition import TruncatedSVD


from .database import get_mongo_client

# separate the data which fetched from csv file with tab '\t'
# fetched from u.data


class CollaborativeRecommendation():

    product_collection: Collection = None
    customer_collection: Collection = None
    order_collection: Collection = None

    product_Dataframe: DataFrame = None
    customer_Dataframe: DataFrame = None
    order_Dataframe: DataFrame = None

    corr_matrix = None


    def __init__(self):
        client = get_mongo_client()
        self.product_collection = client.recommender.product
        self.customer_collection = client.recommender.customer
        self.order_collection = client.recommender.order
        self.product_Dataframe = CollaborativeRecommendation.convert_product_collection_to_df(self.product_collection)
        self.customer_Dataframe = CollaborativeRecommendation.convert_customer_collection_to_df(self.customer_collection)
        self.order_Dataframe = CollaborativeRecommendation.convert_order_collection_to_df(self.order_collection)
        self.merge_dataframes()
        self.create_prediction_data()

    def convert_order_collection_to_df(collection: Collection) -> DataFrame:
        df = pd.DataFrame(list(collection.find()))

        # Alle User, Alle Produkte, ein user hat x produkte gekauft
        return df

    def convert_customer_collection_to_df(collection: Collection) -> DataFrame:
        df = pd.DataFrame(list(collection.find({}, {"_id": 1})))

        # Alle User, Alle Produkte, ein user hat x produkte gekauft
        return df

    def convert_product_collection_to_df(collection: Collection) -> DataFrame:
        df = pd.DataFrame(list(collection.find({}, {"_id": 1})))
        return df

    def calculate_corr_matrix(self):
        product_df = self.product_Dataframe.copy()
        product_df.rename(columns={'_id' : 'product_id'}, inplace=True)

        buy_df = pd.DataFrame({}, columns=['product_id', 'customer_id', 'buyed'])

        for index, row in self.order_Dataframe.iterrows():
            for product in row['products']:
                buy_df = buy_df.append({
                    'product_id': product['_id'], 
                    'customer_id': row['customerId'], 
                    'buyed': 1
                }, ignore_index=True)


        combined_df = pd.merge(product_df, buy_df, on='product_id')
        combined_df.groupby('product_id')['buyed'].count().sort_values(ascending=False).head()

        buyed_crosstab = combined_df.pivot_table(values='buyed', index='customer_id', columns='product_id',
                                                        fill_value=0)       

        # Here we transponate the matrix
        X = buyed_crosstab.T

        # passing random_state = 17 to get the same repeatable results
        SVD = TruncatedSVD(n_components=12, random_state=17)
        resultant_matrix = SVD.fit_transform(X)

        self.corr_matrix = np.corrcoef(resultant_matrix)


    def create_prediction_data(self):
        pass


    def get_order():
        pass



    def old_test_movies(self):   
        columns = ['user_id', 'item_id', 'rating', 'timestamp']

        frame = pd.read_csv('src/u.data', sep='\t', names=columns)

        # fetched from u.item
        columns = ['item_id', 'movie title', 'release date', 'video release date', 'IMDb URL', 'unknown', 'Action', 'Adventure',
                'Animation', 'Childrens', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'Film-Noir', 'Horror',
                'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western']

        movies = pd.read_csv('src/u.item', sep='|', names=columns, encoding='latin-1')
        movie_names = movies[['item_id', 'movie title']]

        print(movies)

        combined_movies_data = pd.merge(frame, movie_names, on='item_id')

        combined_movies_data.groupby('item_id')['rating'].count().sort_values(ascending=False).head()

        # this id will give us one article in the dataset
        filter = combined_movies_data['item_id'] == 50

        index = combined_movies_data[filter]['movie title'].unique()

        print("### Movie name ###")
        print(index)
        print("")

        rating_crosstab = combined_movies_data.pivot_table(values='rating', index='user_id', columns='movie title',
                                                        fill_value=0)

        print(rating_crosstab)    

        # Here we transponate the matrix
        X = rating_crosstab.T

        # passing random_state = 17 to get the same repeatable results
        SVD = TruncatedSVD(n_components=12, random_state=17)
        resultant_matrix = SVD.fit_transform(X)

        corr_mat = np.corrcoef(resultant_matrix)

        # pulling the movie names from ratings crosstab columns
        # convert numpy array to a list then retrieve index of Star Wars, 1977
        movie_names = rating_crosstab.columns
        movies_list = list(movie_names)
        star_wars = movies_list.index(index)

        print("### Movie Index ###")
        print(star_wars)
        print("")

        # isolating the array that represents Star Wars
        corr_star_wars = corr_mat[star_wars]


        # TODO: Check if on of the lists are empty, then take another value
        # TODO: Check if one of the lists are too full, then set the value higher

        print("### 0.9 < List < 1")
        print(list(movie_names[(corr_star_wars < 1.0) & (corr_star_wars > 0.9)]))

        print("")
        print("### 0.95 < List < 1")
        print(list(movie_names[(corr_star_wars < 1.0) & (corr_star_wars > 0.95)]))
        return

