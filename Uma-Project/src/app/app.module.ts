import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './public/home/home.component';
import { FooterComponent } from './public/footer/footer.component';
import { ToolbarComponent } from './public/toolbar/toolbar.component';
import { UsersComponent } from './business/users/users.component';
import { ProductsComponent } from './business/products/products.component';

import { MaterialModule } from 'src/shared/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    ToolbarComponent,
    UsersComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
