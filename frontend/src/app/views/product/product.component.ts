import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { Product } from 'src/app/core/dto';
import { RecommenderService, ProductService, CardService } from 'src/app/core/services';
import { Location } from '@angular/common';

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
        private _location: Location,
        private productService: ProductService,
        private recommenderService: RecommenderService,
        private cardService: CardService
    ) {}

    ngOnInit(): void {
        this.categoryId = this.activatedRoute.snapshot.params.catId;
        const productId = this.activatedRoute.snapshot.params.productId;
        this.product = this.productService.getProductById(productId);
        this.contentBasedRecommendations = this.recommenderService.getProductRecommendations(productId);
    }

    public onGoBackClicked(): void {
        this._location.back();
    }

    public async addToCard(): Promise<void> {
        const product = await firstValueFrom(this.product);
        this.cardService.addProductToShoppingCard(product._id);
    }
}
