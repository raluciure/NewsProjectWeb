import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { EditArticleComponent } from './edit-article/edit-article.component';
import { CreateArticleComponent } from './create-article/create-article.component';

const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'articles/:article_id', component: ArticleDetailComponent },
  { path: 'articles-list/:category', component: ArticlesListComponent },
  { path: 'article/edit/:article_id', component: EditArticleComponent },
  { path: 'article/create', component: CreateArticleComponent },
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
