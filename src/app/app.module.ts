import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LoginComponent } from './login/login.component';
import { ArticleEditionComponent } from './article-edition/article-edition.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    CategoryPipe,
    ArticleDetailComponent,
    NavigationBarComponent,
    LoginComponent,
    ArticleEditionComponent,
  ],
  imports: [
    BrowserModule,
    AngularEditorModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
