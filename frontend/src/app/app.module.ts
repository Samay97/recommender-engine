import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewModule } from './views';
import { SharedModule } from './core/shared-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
    declarations: [AppComponent],
    imports: [        
        BrowserModule,
        AppRoutingModule,
        ViewModule,
        HttpClientModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        BarRatingModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
