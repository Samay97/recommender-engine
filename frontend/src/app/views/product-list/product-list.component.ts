import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category, Product } from 'src/app/core/dto';
import { ProductService } from 'src/app/core/services';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    private categoryId: string = '';
    public products: Observable<Product[]>;
    public category: Observable<Category>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private categoryService: CategoryService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.categoryId = this.activatedRoute.snapshot.params.catId;
        this.products = this.productService.getProductsByCategory(this.categoryId);
        this.category = this.categoryService.getCategoryById(this.categoryId);
    }

    public onProductClicked(product: Product): void {
        this.router.navigate([this.router.url, 'product', product._id]);
    }

    public onGoBackClicked(): void {
        this.router.navigate(['/home']);
    }
}
