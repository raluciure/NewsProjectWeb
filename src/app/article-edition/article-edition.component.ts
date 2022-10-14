import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-article',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit {
  article: Article;
  article_id?: string | null;
  message?: string;

  @ViewChild('articlesForm') articleForm: any;

  constructor(private article_service: NewsService, private route: ActivatedRoute, private location: Location, private router: Router) {
    this.article = { id: 0, title: "", subtitle: "", abstract: "", body: "",  category: ""};
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        // window.alert('The URL has been updated'); 
        this.article_id = params.get('id');
      }
    )
    this.getArticle(this.article_id);
  }

  getArticle(id: any) {
    this.article_service.getArticle(id).subscribe(article => this.article = article);
  }

  edit() {
    let myarticle = { id: 0, title: this.article.title, subtitle: this.article.subtitle, abstract: this.article.abstract, body: this.article.body,  category: this.article.category};

    this.article_service.createArticle(myarticle).subscribe(
      _ => {
        this.message = 'Article added successfully';
      },
      err => {
        this.message = `An error has ocurred: ${err.statusText}`;
      }
    );
  }

  reset(): void {
    this.articleForm.reset();
  }

  goBack(): void {
    this.location.back();
  }

}
