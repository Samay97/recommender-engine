import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/dto';
import { ProductService } from 'src/app/core/services';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    public product: Observable<Product>;

    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}

    ngOnInit(): void {
        this.product = this.productService.getProductById(this.activatedRoute.snapshot.params.productId);
    }
}
