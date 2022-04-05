import { Component, OnInit } from '@angular/core';
import { CardService, ProductService } from 'src/app/core/services';
import { Card, Product } from 'src/app/core/dto';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../dialog/login-dialog/login-dialog.component';
import { first, Observable, take } from 'rxjs';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    public card: Card | undefined;
    public products: Product[] = [];

    constructor(private cardService: CardService, private productService: ProductService, private dialog: MatDialog) {}

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
        if (!this.card) return;
        if (!this.card.products) return;
        this.products = [];
        this.card.products.forEach((productId: string) => {
            this.productService.getProductById(productId).subscribe((product) => this.products.push(product));
        });
    }

    public removeProduct(productId: string): void {
        this.cardService.removeProductFromShoppingList(productId);
        this.card = this.cardService.getShoppingCard();
        this.getProducts();
    }
}
