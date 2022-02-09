import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/products.interface';
import productModel from '@models/product.model';
import { isEmpty } from '@utils/util';
import { CreateProductDto } from '@/dtos/products.dto';

class ProductService {
  public products = productModel;

  public async findAllProducts(): Promise<Product[]> {
    const products: Product[] = await this.products.find();
    return products;
  }

  public async findProductById(productId: string): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, 'No Product id');

    const findProduct: Product = await this.products.findOne({ _id: productId });
    if (!findProduct) throw new HttpException(409, '');

    return findProduct;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const findProduct: Product = await this.products.findOne({ name: productData.name });
    if (findProduct) throw new HttpException(409, `You're product ${productData.name} already exists`);

    const createProductData: Product = await this.products.create({ ...productData });

    return createProductData;
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const deleteProductById: Product = await this.products.findByIdAndDelete(productId);
    if (!productId) throw new HttpException(409, '');

    return deleteProductById;
  }
}

export default ProductService;
