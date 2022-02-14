import { HttpException } from '@exceptions/HttpException';
import categoryModel from '@models/category.model';
import { isEmpty } from '@utils/util';
import { Category } from '@interfaces/category.interface';
import { CreateCategoryDto } from '@dtos/category.dto';

class CategoryService {
  public categories = categoryModel;

  public async findAllCategories(): Promise<Category[]> {
    const categoriesResult: Category[] = await this.categories.find();
    return categoriesResult;
  }

  public async findCategoryById(categoryId: string): Promise<Category> {
    if (isEmpty(categoryId)) throw new HttpException(400, 'No Category id');

    const findCategory: Category = await this.categories.findById(categoryId);
    if (!findCategory) throw new HttpException(409, '');

    return findCategory;
  }

  public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, 'No provided category data');

    const findCategory: Category = await this.categories.findOne({ name: categoryData.name });
    if (findCategory) throw new HttpException(409, `You're category ${categoryData.name} already exists`);

    const createdCategory: Category = await this.categories.create({ ...categoryData });

    return createdCategory;
  }

  public async deleteCategory(categoryId: string): Promise<Category> {
    const deletedCategory: Category = await this.categories.findByIdAndDelete(categoryId);
    if (!categoryId) throw new HttpException(409, '');

    return deletedCategory;
  }
}

export default CategoryService;
