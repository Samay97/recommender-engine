import { CreateShoppingCartDto } from '@/dtos/shopping_carts.dto';
import { HttpException } from '@exceptions/HttpException';
import { ShoppingCart } from '@interfaces/shoppingCarts.interface';
import shoppingCartModel from '@models/shoppingCarts.model';
import { isEmpty } from '@utils/util';

class ShoppingCartService {
  public shoppingCart = shoppingCartModel;

  public async findShoppingCartByCustomerId(customerId: string): Promise<ShoppingCart> {
    if (isEmpty(customerId)) throw new HttpException(400, 'CustomerId is empty');

    const findShoppingCart: ShoppingCart = await this.shoppingCart.findOne({ customerId: customerId });
    if (!findShoppingCart) throw new HttpException(404, 'Shopping Cart not found');

    return findShoppingCart;
  }

  public async createShoppingCart(shoppingCartData: CreateShoppingCartDto): Promise<ShoppingCart> {
    if (isEmpty(shoppingCartData)) throw new HttpException(400, 'ShoppingCartData is empty');

    const findShoppingCart: ShoppingCart = await this.shoppingCart.findOne({ customerId: shoppingCartData.customerId });
    if (findShoppingCart) throw new HttpException(409, 'Shopping Cart still exists');

    const createShoppingCartData: ShoppingCart = await this.shoppingCart.create({ ...shoppingCartData });

    return createShoppingCartData;
  }

  /**
   * An update function is required, because it should be possible to add
   * and remove products from the shopping cart
   */
  public async updateShoppingCart(customerId: string, shoppingCartData: CreateShoppingCartDto): Promise<ShoppingCart> {
    if (isEmpty(shoppingCartData)) throw new HttpException(400, 'Data is empty');
    if (isEmpty(customerId)) throw new HttpException(400, 'CustomerId is empty');
    /**
     * Id of the shopping cart and the customer id haave to be the same
     * only the products can be overwritten
     */
    const data = this.findShoppingCartByCustomerId(customerId);
    const id = (await data)._id;

    const updateShoppingCartById: ShoppingCart = await this.shoppingCart.findByIdAndUpdate(id, { products: shoppingCartData.products });
    if (!updateShoppingCartById) throw new HttpException(409, 'Update not possible');

    return this.findShoppingCartByCustomerId(customerId);
  }

  /**
   * We do not need a delete function for the shopping cart
   * because every user has one. If there are no products in the shopping cart
   * then it is just empty
   */
}

export default ShoppingCartService;
