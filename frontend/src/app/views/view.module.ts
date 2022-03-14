import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '.';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../core/shared-module.module';

@NgModule({
    declarations: [PageNotFoundComponent, HomeComponent, HeaderComponent, FooterComponent],
    imports: [CommonModule, SharedModule],
    exports: [PageNotFoundComponent, HomeComponent, HeaderComponent, FooterComponent],
})
export class ViewModule {}
