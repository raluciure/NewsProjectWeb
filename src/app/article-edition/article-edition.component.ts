import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-article',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit {
  article: Article;
  message?: string;

  @ViewChild('articlesForm') articleForm: any;

  constructor(private article_service: NewsService, private route: ActivatedRoute, private location: Location, private router: ActivatedRoute) {
    this.article = { id: 0, title: "", subtitle: "", abstract: "", body: "", category: "" };
  }

  ngOnInit(): void {
    const article_id = this.router.snapshot.paramMap.get("article_id");
    this.article_service.getArticle(Number(article_id))
      .subscribe(article => {
        this.article = article;
      })
  }

  edit(articleForm: NgForm, article: Article) {
    article.title = articleForm.value.ntitle;
    article.subtitle = articleForm.value.nsubtitle;
    article.abstract = articleForm.value.nabstract;
    article.body = articleForm.value.nbody;
    console.log('Edited One is', article);
    this.article_service.updateArticle(article).subscribe(
      _ => {
        this.message = 'Article edited successfully';
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
