import { RecommenderProduct } from '@/interfaces/recommender.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

import axios from 'axios';

class RecommenderService {
  private recommnderHost = process.env.RECOMMENDER_HOST || 'recommender';
  private recommnderPort = process.env.RECOMMENDER_PORT || 5000;
  private recommenderRootUrl = `http://${this.recommnderHost}:${this.recommnderPort}/`;

  public async getRecommendationsOnPorductId(productId: string, recommendationsCount = 5, matchingValue = 0.8): Promise<RecommenderProduct[]> {
    if (isEmpty(productId)) throw new HttpException(400, '');

    const recommendation = await axios.get(`${this.recommenderRootUrl}${productId}/recommendation/hybrid`, {
      params: { count: recommendationsCount, matching_value: matchingValue },
    });

    return recommendation.data;
  }
}

export default RecommenderService;
