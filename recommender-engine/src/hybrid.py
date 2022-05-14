from tokenize import String
from turtle import shape
import numpy as np
import pandas as pd
import warnings

from pandas import DataFrame
from bson.objectid import ObjectId

# Ignore pandas warning
warnings.filterwarnings('ignore')

class HybridRecommendation():

    def __init__(self):
        pass
     
    def get_recommendations(self, data_cb: DataFrame, data_col: DataFrame) -> DataFrame:
        result_df = pd.DataFrame()
        result_df['_id'] = ''
        result_df['score'] = ''
        
        data_cb.drop('name', inplace=True, axis=1)
        rows = data_cb.iloc[[0,1]]
        
        if (data_col.shape[0] == 0):
            return data_cb
        elif (data_col.shape[0] > 0 and data_col.shape[0] <= 2):
            # If 2 or less values exist in col filtering add all and fill up with best cb
            result_df = pd.concat([rows, data_col], axis=0)
            
            # Fillup to 5 results
            index = 2
            while (result_df.shape[0] != 5):
                result_df = result_df.append(data_cb.iloc[[index]])
                index = index + 1
        else:
            # Case col filtering has more results
            # 2cb and 2 col are be picked 1 item gets compared
            # better score gets added
            row_col = data_col.iloc[[0,1]]
            result_df = pd.concat([rows, row_col], axis=0)
            
            current_row_cb = data_cb.iloc[[3]]
            current_row_col = data_col.iloc[[3]]
            if (current_row_cb['score'] <= current_row_col['score']):
                result_df.append(current_row_col)
            else:
                result_df.append(current_row_cb)
        
        print(result_df)
        result_df.sort_values(by=['score'], inplace=True, ascending=False)
        print(result_df)
        return result_df
