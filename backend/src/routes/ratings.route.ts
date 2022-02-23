import { Router } from 'express';
import RatingController from '@controllers/ratings.controller';
import { CreateRatingsDto } from '@dtos/ratings.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class RatingRoute implements Routes {
  public path = '/rating';
  public router = Router();
  public ratingController = new RatingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.ratingController.getRatingsByCustomerId);
    this.router.get(`${this.path}/product/:id`, this.ratingController.getRatingsByProductId);
    this.router.post(`${this.path}`, validationMiddleware(CreateRatingsDto, 'body'), this.ratingController.createRating);
    this.router.delete(`${this.path}/:id`, this.ratingController.deleteRating);
  }
}

export default RatingRoute;
