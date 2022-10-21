import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { ArticleEditionComponent } from './article-edition/article-edition.component';

const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'articles/:article_id', component: ArticleDetailComponent },
  { path: 'articles-list/:category', component: ArticlesListComponent },
  { path: 'article/edit/:article_id', component: ArticleEditionComponent },
  { path: 'article/create', component: ArticleEditionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['']);
    }
  }
}
