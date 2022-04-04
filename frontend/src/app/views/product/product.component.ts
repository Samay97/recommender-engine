import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/dto';
import { RecommenderService, ProductService } from 'src/app/core/services';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    private categoryId: string;
    public product: Observable<Product>;
    public contentBasedRecommendations: Observable<Product[]>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private recommenderService: RecommenderService
    ) {}

    ngOnInit(): void {
        this.categoryId = this.activatedRoute.snapshot.params.catId;
        const productId = this.activatedRoute.snapshot.params.productId;
        this.product = this.productService.getProductById(productId);
        this.contentBasedRecommendations = this.recommenderService.getProductRecommendations(productId);
    }

    public onGoBackClicked(): void {
        this.router.navigate(['/browse', this.categoryId]);
    }
}
