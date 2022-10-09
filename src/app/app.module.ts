import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlesListComponent } from './articles-list/articles-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
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
