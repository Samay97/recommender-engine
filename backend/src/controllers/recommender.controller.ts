import { NextFunction, Request, Response } from 'express';
import RecommenderService from '@/services/recommender.service';
import ProductService from '@/services/products.service';
import { RecommenderProduct } from '@/interfaces/recommender.interface';


class RecommenderController {

  private recommenderService = new RecommenderService();
  private productService = new ProductService();

  public getRecommendation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.productId;
      
      let products = await this.recommenderService.getRecommendationsOnPorductId(productId);

      const promises = [];
      products.forEach((product: RecommenderProduct) => {
        promises.push(this.productService.findProductById(product._id));
      });

      products = await Promise.all(promises);

      res.status(200).json({ data: products, message: 'findMany' });
    } catch (error) {
      next(error);
    }
  };
}

export default RecommenderController;
