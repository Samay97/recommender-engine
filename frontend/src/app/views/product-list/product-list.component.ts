import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/dto';
import { ProductService } from 'src/app/core/services';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    private categoryId: string = '';
    public products: Observable<Product[]>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.categoryId = this.activatedRoute.snapshot.params.catId;
        this.products = this.productService.getProductsByCategory(this.categoryId);
    }

    public onProductClicked(product: Product): void {
        this.router.navigate([this.router.url, 'product', product._id]);
    }
}
