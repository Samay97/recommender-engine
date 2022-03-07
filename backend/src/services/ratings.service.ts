import { CreateRatingsDto } from '@dtos/ratings.dto';
import { HttpException } from '@exceptions/HttpException';
import { Ratings } from '@interfaces/ratings.interface';
import ratingModel from '@models/ratings.model';
import { isEmpty } from '@utils/util';

class RatingService {
  public ratings = ratingModel;

  public async getRatingsByProductId(productId: string): Promise<Ratings[]> {
    if (isEmpty(productId)) throw new HttpException(400, '');

    const ratings: Ratings[] = await this.ratings.find({ productId: productId });
    if (!ratings) throw new HttpException(404, '');

    return ratings;
  }

  public async getRatingsByCustomerId(customerId: string): Promise<Ratings[]> {
    if (isEmpty(customerId)) throw new HttpException(400, '');

    const ratings: Ratings[] = await this.ratings.find({ _id: customerId });
    if (!ratings) throw new HttpException(404, '');

    return ratings;
  }

  public async createRating(ratingData: CreateRatingsDto): Promise<Ratings> {
    if (isEmpty(ratingData)) throw new HttpException(400, '');

    const findCustomerId: Ratings = await this.ratings.findOne({ customerId: ratingData.customerId });
    const findProductId: Ratings = await this.ratings.findOne({ productId: ratingData.productId });
    if (findCustomerId && findProductId) throw new HttpException(409, 'Your Rating still exists');

    const createRatingData: Ratings = await this.ratings.create({ ...ratingData });

    return createRatingData;
  }

  public async deleteRating(ratingId: string): Promise<Ratings> {
    const deleteRatingById: Ratings = await this.ratings.findByIdAndDelete(ratingId);
    if (!deleteRatingById) throw new HttpException(409, '');

    return deleteRatingById;
  }
}

export default RatingService;
