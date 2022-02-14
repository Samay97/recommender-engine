import { NextFunction, Request, Response } from 'express';
import CategoryService from '@services/category.service';
import { Category } from '@interfaces/category.interface';
import { CreateCategoryDto } from '@dtos/category.dto';

class CategoryController {
  public categoryService = new CategoryService();

  public getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId: string = req.params.id;
      const category: Category = await this.categoryService.findCategoryById(categoryId);

      res.status(200).json({ data: category, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories: Category[] = await this.categoryService.findAllCategories();

      res.status(200).json({ data: categories, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryData: CreateCategoryDto = req.body;
      const createdCategory: Category = await this.categoryService.createCategory(categoryData);

      res.status(201).json({ data: createdCategory, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId: string = req.params.id;
      const deletedCategory: Category = await this.categoryService.deleteCategory(categoryId);

      res.status(200).json({ data: deletedCategory, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
