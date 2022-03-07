import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/products.interface';
import productModel from '@models/product.model';
import { isEmpty } from '@utils/util';
import { CreateProductDto } from '@/dtos/products.dto';

class ProductService {
  private products = productModel;

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
    if (!deleteProductById) throw new HttpException(409, 'Deletion not possible');

    return deleteProductById;
  }

  /*
  public async update(): Promise<any[]> {
    const cat_map = new Map([
      ["C0B7BBA234AEBFADAA29B23010F69288A2BA2383", "Computer Componets"],
      ["7A187842053FDDF1AE669449DC29CBC7CE3562A7", "Computer Monitor"],
      ["26A14AD82BA129ED1B6E3AF89F1F3F8D58AE23FC", "Computer Keyboards & Mice"],
      ["594697AAE26E8EC6C0556DDAC59923082A665B29", "Laptops"],
      ["C4CDBF4DECE6494C8931BB08A49CC88AD013322F", "Handy"],
      ["33AFD022EDB3595C27D5EE7D24C0D0247B1526C6", "Audio"],
      ["173494FB06E41709B123B8FA9A389A1B926524BA", "Drucker"],
      ["FC3B7FDDF7610785C8009B6F00F7DD051363E70E", "Maus und Mauspad"],
      ["74F7EB35AA02D9F4CFFB8318DC3AB1FF31BF693E", "Smart TV"],
      ["A5CBEC538AC691D57DB949198D022004307C97D8", "Software"],
      ["02842EC267E94A40F50D43C6448E20AF601EE05C", "Audio and Video Components"]
    ]);


    const catServicxe = new CategoryService();
    const products = await this.findAllProducts();

    for (const product of products) {
      const cat = await catServicxe.findCategoryByName(cat_map.get(product.category));
      const newProduct1 = await this.products.updateOne({_id: product._id}, {category: cat._id} , {multi: true});
      const newProduct = await this.products.updateOne({_id: product._id}, {$unset: {cat: 1}} , {multi: true});
    }
    

    return [];
  }
  */
}

export default ProductService;
