import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category, Product } from '../../core/dto';
import { ProductService } from '../../core/services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public product: Observable<Product>;
    public categories: Observable<Category[]>;

    constructor(private productService: ProductService, private categoryService: CategoryService) {
        this.product = this.productService.getProductById('620111b3d2da416cdc967d72');
        this.categories = this.categoryService.getAllCategories();
    }

    ngOnInit(): void {}
}
