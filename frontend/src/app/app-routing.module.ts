import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent, HomeComponent } from './views';
import { CardComponent } from './views/card/card.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductComponent } from './views/product/product.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
    { path: 'browse/:catId', component: ProductListComponent },
    { path: 'browse/:catId/product/:productId', component: ProductComponent },
    { path: 'card', component: CardComponent },
    { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
