import { NextFunction, Request, Response } from 'express';
import { CreateRatingsDto } from '@dtos/ratings.dto';
import { Ratings } from '@interfaces/ratings.interface';
import ratingService from '@services/ratings.service';

class RatingController {
  public ratingService = new ratingService();

  public getRatingsByCustomerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId: string = req.params.id;
      const findRatings: Ratings[] = await this.ratingService.getRatingsByCustomerId(customerId);

      res.status(200).json({ data: findRatings, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRatingsByProductId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const findRatings: Ratings[] = await this.ratingService.getRatingsByProductId(productId);

      let ratings = 0;
      length = findRatings.length;
      for (let i = 0; i < length; i = i + 1) {
        ratings = ratings + findRatings[i].rating;
      }

      const total_rating = ratings / length;

      const data = [total_rating, length];

      res.status(200).json({ data: data, message: 'getTotalRating' });
    } catch (error) {
      next(error);
    }
  };

  public createRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ratingData: CreateRatingsDto = req.body;
      const createRatingData: Ratings = await this.ratingService.createRating(ratingData);

      res.status(201).json({ data: createRatingData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ratingId: string = req.params.id;
      const deleteRatingData: Ratings = await this.ratingService.deleteRating(ratingId);

      res.status(200).json({ data: deleteRatingData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RatingController;
