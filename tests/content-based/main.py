import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel


def create_soup(x):
    return ''.join(x['keywords']) + '' + ''.join(x['genres']) + '' + ''.join(x['overview'])


def get_recommendations(title, cosine_sim):
    idx = indices[title]

    sim_scores = list(enumerate(cosine_sim[idx]))

    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    movie_indices = [i[0] for i in sim_scores]

    return movies['title_y'].iloc[movie_indices]


if __name__ == "__main__":
    credits = pd.read_csv("kaggle/tmdb_5000_credits.csv")
    movies = pd.read_csv("kaggle/tmdb_5000_movies.csv")

    credits.columns = ['id', 'title', 'cast', 'crew']
    movies = movies.merge(credits, on='id')

    movies['overview'] = movies['overview'].fillna('')

    movies['soup'] = movies.apply(create_soup, axis=1)

    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(movies['soup'])

    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    indices = pd.Series(movies.index, index=movies['title_x']).drop_duplicates()

    print(get_recommendations("Pirates of the Caribbean: Dead Man's Chest", cosine_sim))