import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '.';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [PageNotFoundComponent, HomeComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [PageNotFoundComponent, HomeComponent, HeaderComponent, FooterComponent]
})
export class ViewModule { }
