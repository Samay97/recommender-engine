import numpy as np
import pandas as pd

from sklearn.decomposition import TruncatedSVD

# separate the data which fetched from csv file with tab '\t'
# fetched from u.data

columns = ['user_id', 'item_id', 'rating', 'timestamp']

frame = pd.read_csv('u.data', sep='\t', names=columns)

# fetched from u.item
columns = ['item_id', 'movie title', 'release date', 'video release date', 'IMDb URL', 'unknown', 'Action', 'Adventure',
           'Animation', 'Childrens', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'Film-Noir', 'Horror',
           'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western']

movies = pd.read_csv('u.item', sep='|', names=columns, encoding='latin-1')
movie_names = movies[['item_id', 'movie title']]

combined_movies_data = pd.merge(frame, movie_names, on='item_id')

combined_movies_data.groupby('item_id')['rating'].count().sort_values(ascending=False).head()

# this id will give us one article in the dataset
filter = combined_movies_data['item_id'] == 601

index = combined_movies_data[filter]['movie title'].unique()

print("### Movie name ###")
print(index)
print("")

rating_crosstab = combined_movies_data.pivot_table(values='rating', index='user_id', columns='movie title',
                                                   fill_value=0)

# i guess here we transponate the matrix
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
