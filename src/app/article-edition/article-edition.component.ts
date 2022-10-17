import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-article',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit {
  article: Article;
  message?: string;
  cardImageBase64: any;
  isImageSaved: boolean = false;

  @ViewChild('articlesForm') articleForm: any;

  constructor(private article_service: NewsService, private loginService: LoginService, private route: ActivatedRoute, private location: Location, private router: Router) {
    this.article = { id: 0, title: "", subtitle: "", abstract: "", body: "", category: "" };
  }

  ngOnInit(): void {
    const article_id = this.route.snapshot.paramMap.get("article_id");
    this.article_service.getArticle(Number(article_id))
      .subscribe(article => {
        this.article = article;
      })
  }

  edit(articleForm: NgForm, article: Article) {
    Swal.fire({
      title: 'Are you sure you want to save the changes?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        article.title = articleForm.value.ntitle;
        article.subtitle = articleForm.value.nsubtitle;
        article.abstract = articleForm.value.nabstract;
        article.body = articleForm.value.nbody;
        console.log('Edited One is', article);
        this.article_service.updateArticle(article).subscribe(
          _ => {
            this.message = 'Article edited successfully!';
            this.redirectTo(`/articles`)
          },
          err => {
            this.message = `An error has ocurred: ${err.statusText}`;
          });
        Swal.fire('Article edited successfully!', '', 'success');
      }
      else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

  fileChangeEvent(fileInput: any, article: Article) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = _ => {
        const imgBase64Path = e.target.result;
        this.cardImageBase64 = imgBase64Path;
        this.isImageSaved = true;
        article.image_media_type = fileInput.target.files[0].type;

        if (article.image_media_type != undefined) {
          const head = article.image_media_type?.length + 13;
          article.image_data = e.target.result.substring(head, e.target.result.length);
        }
      };
    };
    reader.readAsDataURL(fileInput.target.files[0]);
  }


  setCategory(event: any, article: Article) {
    article.category = event.target.value;
  }

  isLoggedIn(): boolean {
    return this.loginService.isLogged();
  }

  reset(): void {
    this.articleForm.reset();
  }

  goBack(): void {
    this.location.back();
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}
