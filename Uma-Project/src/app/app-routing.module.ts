import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { UsersComponent } from './business/users/users.component';
import { ProductsComponent } from './business/products/products.component';
import { PublicationComponent } from './business/publication/publication.component';
import { PublicationDetailComponent } from './business/publication-detail/publication-detail.component';
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'publications', component: PublicationComponent},
  {path: 'publications/:id', component: PublicationDetailComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
