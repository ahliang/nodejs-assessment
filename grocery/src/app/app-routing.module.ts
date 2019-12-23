import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroceryListComponent } from './components/grocery/grocery-list/grocery-list.component';
import { GroceryViewComponent } from './components/grocery/grocery-view/grocery-view.component';

const routes: Routes = [
  {path: 'grocery-list' , component: GroceryListComponent},
  {path: 'grocery-view/:id' , component: GroceryViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }