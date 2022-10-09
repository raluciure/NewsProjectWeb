import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/articles-list', pathMatch: 'full' },
  { path: 'articles-list', component: ArticlesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['']); // when the URL does not match redirect to initial default route
    }
  }
}
