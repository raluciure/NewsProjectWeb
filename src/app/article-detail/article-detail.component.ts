import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Article } from "../interfaces/article";
import { NewsService } from "../services/news.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  constructor(
    private articleService: NewsService,
    private router: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    const article_id = this.router.snapshot.paramMap.get("article_id");
    this.articleService.getArticle(Number(article_id))
      .subscribe(article => {
        this.article = article;
        console.log(this.article);
      })
      
  }

  goBack(): void {
    this.location.back();
  }

}
