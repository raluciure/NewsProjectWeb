import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  article: Article;
  articlesList: Article[] = [];
  message?: string;


  @ViewChild('articlesForm') articleForm: any;


  constructor(private article_service: NewsService, private route: ActivatedRoute, private location: Location, private router: Router) { 
    this.article = {id: 0, title: "", subtitle: "", abstract: "", body: "", category: ""};
  }

  ngOnInit(): void {
    this.getArticlesList();
  }

  getArticlesList() {
    this.article_service.getArticles().subscribe(list=> this.articlesList = list);
  }

  add(): void{
    let myarticle = {id: 0 , title: this.article.title, subtitle: this.article.subtitle, abstract: this.article.abstract, body: this.article.body, category: this.article.category};

    this.article_service.createArticle(myarticle).subscribe(
      _ => {
        this.message = 'Article added successfully';
      },
      err => {
        this.message = `An error has ocurred: ${err.statusText}`;
      }
    );
    this.getArticlesList();
    this.reset()
    }

  reset(): void {
    this.articleForm.reset();
  }

  goBack(): void {
    this.location.back();
  }
}
