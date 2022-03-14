import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewModule } from './views';
import { SharedModule } from './core/shared-module.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, ViewModule, HttpClientModule, SharedModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
