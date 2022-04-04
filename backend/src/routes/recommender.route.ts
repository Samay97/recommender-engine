import { Router } from 'express';
import RecommenderController from '@controllers/recommender.controller';
import { Routes } from '@interfaces/routes.interface';


class RecommenderRoute implements Routes {
  public path = '/recommender';
  public router = Router();
  public recommenderController = new RecommenderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:productId`, this.recommenderController.getRecommendation);
  }
}

export default RecommenderRoute;
