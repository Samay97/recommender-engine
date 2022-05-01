import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardService, ProductService, OrderService } from 'src/app/core/services';
import { Card, Product } from 'src/app/core/dto';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../dialog/login-dialog/login-dialog.component';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    public card: Card | undefined;
    public products: Product[] = [];

    constructor(
        private cardService: CardService,
        private productService: ProductService,
        private orderService: OrderService,
        private dialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.card = this.cardService.getShoppingCard();
        this.getProducts();
        this.cardService.cardIsAvaiable.subscribe(() => {
            this.card = this.cardService.getShoppingCard();
            this.getProducts();
        });
    }

    public openDialog() {
        this.dialog.open(LoginDialogComponent, { width: '50%' });
    }

    public getProducts(): void {
        this.products = [];
        this.cdr.detectChanges();

        if (!this.card) return;
        if (!this.card.products) return;
        if (this.card.products.length == 0) return;

        this.card.products.forEach((productId: string) => {
            this.productService.getProductById(productId).subscribe((product) => this.products.push(product));
        });
    }

    public async removeProduct(productId: string): Promise<void> {
        await this.cardService.removeProductFromShoppingList(productId);
        this.card = this.cardService.getShoppingCard();
        this.getProducts();
    }

    public async placeOrderClicked(): Promise<void> {
        const products: Product[] = [...this.products];
        const order = await lastValueFrom(this.orderService.createOrder(products));
        console.log(order);

        for (const key in products) {
            if (Object.prototype.hasOwnProperty.call(products, key)) {
                const element: Product = products[key];
                this.card = await this.cardService.removeProductFromShoppingList(element._id);
            }
        }

        this.getProducts();
    }
}
