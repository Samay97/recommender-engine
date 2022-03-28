import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category, Product } from 'src/app/core/dto';
import { ProductService } from 'src/app/core/services';
import { CategoryService } from 'src/app/core/services/category.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    private categoryId: string = '';
    public products: Observable<Product[]>;
    public category: Observable<Category>;
    public currentPage = 1;
    public maxPage = 0;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private categoryService: CategoryService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.queryParams.pipe(filter((params: any) => params.page)).subscribe((params: any) => {
            this.currentPage = +params.page;
            this.products = this.productService.getProductsByCategory(this.categoryId, this.currentPage);
        });
        this.categoryId = this.activatedRoute.snapshot.params.catId;
        this.products = this.productService.getProductsByCategory(this.categoryId, this.currentPage);
        this.category = this.categoryService.getCategoryById(this.categoryId);
        this.productService.getMaxPageInCategory(this.categoryId).subscribe((maxPage) => {
            this.maxPage = +maxPage;
            if (this.maxPage < this.currentPage) {
                this.goToPage(1);
            }
        });
    }

    public onProductClicked(product: Product): void {
        this.router.navigate([this.router.url, 'product', product._id]);
    }

    public onGoBackClicked(): void {
        this.router.navigate(['/home']);
    }

    public goNextPage(): void {
        if (this.currentPage + 1 > this.maxPage) return;
        this.goToPage(this.currentPage + 1);
    }

    public goBeforePage(): void {
        if (this.currentPage - 1 < 1) return;
        this.goToPage(this.currentPage - 1);
    }

    private goToPage(page: number): void {
        this.currentPage = page;
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { page },
            queryParamsHandling: 'merge',
        });
    }
}
