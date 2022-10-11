import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    CategoryPipe,
    ArticleDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgbModule,
    FormsModule,                              
    ReactiveFormsModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
