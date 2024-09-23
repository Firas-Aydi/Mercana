import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import { ProductsComponent } from './products/products.component';
import { CategorieComponent } from './categorie/categorie.component';

const routes: Routes = [
  { path: '', component: BienvenueComponent },
  { path: 'categorie', component: CategorieComponent },
  { path: 'products/:sid/:nom', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
