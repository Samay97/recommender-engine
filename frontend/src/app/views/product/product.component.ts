import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { Customer, Product } from 'src/app/core/dto';
import { RecommenderService, ProductService, CardService, UserService } from 'src/app/core/services';
import { Location } from '@angular/common';
import { LoginDialogComponent } from '../dialog/login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    private categoryId: string;
    public product: Observable<Product>;
    public contentBasedRecommendations: Observable<Product[]>;
    public userLogedIn: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _location: Location,
        private productService: ProductService,
        private recommenderService: RecommenderService,
        private cardService: CardService,
        private userService: UserService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((routeParams) => {
            this.categoryId = routeParams.catId;
            const productId = routeParams.productId;
            this.product = this.productService.getProductById(productId);
            this.contentBasedRecommendations = this.recommenderService.getProductRecommendations(productId);
        });
        this.userService.userIsLoggedIn.subscribe((data) => {
            if (data) {
                this.userLogedIn = true;
            }
        });
    }

    public onGoBackClicked(): void {
        this._location.back();
    }

    public async addToCard(): Promise<void> {
        if (this.userLogedIn) {
            const product = await firstValueFrom(this.product);
            this.cardService.addProductToShoppingCard(product._id);
        } else {
            this.dialog.open(LoginDialogComponent, { width: '50%' });
        }
    }

    public goToProduct(product: Product): void {
        this.router.navigate(['/browse', product.category, 'product', product._id]);
    }
}
