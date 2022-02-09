import { CreateShoppingCartDto } from '@/dtos/shopping_carts.dto';
import { HttpException } from '@exceptions/HttpException';
import { ShoppingCart } from '@interfaces/shoppingCarts.interface';
import shoppingCartModel from '@models/shoppingCarts.model';
import { isEmpty } from '@utils/util';

class ShoppingCartService {
  public shoppingCart = shoppingCartModel;

  public async findShoppingCartByCustomerId(id: string): Promise<ShoppingCart> {
    if (isEmpty(id)) throw new HttpException(400, '');

    const findShoppingCart: ShoppingCart = await this.shoppingCart.findOne({ customerId: id });
    if (!findShoppingCart) throw new HttpException(409, '');

    return findShoppingCart;
  }

  public async createShoppingCart(shoppingCartData: CreateShoppingCartDto): Promise<ShoppingCart> {
    if (isEmpty(shoppingCartData)) throw new HttpException(400, '');

    const findShoppingCart: ShoppingCart = await this.shoppingCart.findOne({ customerId: shoppingCartData.customerId });
    if (findShoppingCart) throw new HttpException(409, '');

    const createShoppingCartData: ShoppingCart = await this.shoppingCart.create({ ...shoppingCartData });

    return createShoppingCartData;
  }

  /**
   * An update function is required, because it should be possible to add
   * and remove products from the shopping cart
   */
  public async updateShoppingCart(customerId: string, shoppingCartData: CreateShoppingCartDto): Promise<ShoppingCart> {
    if (isEmpty(shoppingCartData)) throw new HttpException(400, '');

    /**
     * Id of the shopping cart and the customer id haave to be the samr
     * only the products can be overwritten
     */
    const data = this.findShoppingCartByCustomerId(customerId);
    const id = (await data)._id;

    const updateShoppingCartById: ShoppingCart = await this.shoppingCart.findByIdAndUpdate(id, { shoppingCartData });
    if (!updateShoppingCartById) throw new HttpException(409, "You're not user");

    return updateShoppingCartById;
  }

  /**
   * We do not need a delete function for the shopping cart
   * because every user has one. If there are no products in the shopping cart
   * then it is just empty
   */
}

export default ShoppingCartService;
