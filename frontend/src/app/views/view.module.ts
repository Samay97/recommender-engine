import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '.';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../core/shared-module.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        ProductListComponent,
        ProductComponent,
        RecommendationsComponent,
    ],
    imports: [CommonModule, SharedModule],
    exports: [PageNotFoundComponent, HomeComponent, HeaderComponent, FooterComponent, ProductListComponent],
})
export class ViewModule {}
