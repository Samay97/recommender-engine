import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/dto';
import { ProductService } from 'src/app/core/services';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    private categoryId: string;
    public product: Observable<Product>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.categoryId = this.activatedRoute.snapshot.params.catId;
        this.product = this.productService.getProductById(this.activatedRoute.snapshot.params.productId);
    }

    public onGoBackClicked(): void {
        this.router.navigate(['/browse', this.categoryId]);
    }
}
