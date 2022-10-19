import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news.service';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  article: Article;
  articlesList: Article[] = [];
  message?: string;
  cardImageBase64: any;
  isImageSaved: boolean = false;
  imageError?: string;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top'
  };


  @ViewChild('articleForm') articleForm: any;


  constructor(private article_service: NewsService, private loginService: LoginService, private route: ActivatedRoute, private location: Location, private router: Router) {
    this.article = {} as Article;
  }

  ngOnInit(): void {
    this.getArticlesList();
  }

  getArticlesList() {
    this.article_service.getArticles().subscribe(list => this.articlesList = list);
  }

  createArticle(articleForm: NgForm): void {
    this.article.title = articleForm.value.ntitle;
    this.article.subtitle = articleForm.value.nsubtitle;
    this.article.abstract = articleForm.value.nabstract;
    this.article.body = articleForm.value.nbody;
    const article = this.article;
    this.article_service.createArticle(article).subscribe(
      _ => {
        Swal.fire('Article created successfully!', '', 'success');
        this.redirectTo(`/articles`)
      },
      err => {
        Swal.fire('Error creating the article!', '', 'error');
      });
  }

  fileChangeEvent(fileInput: any, article: Article) {
    this.imageError = undefined;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > MAX_SIZE) {
        this.imageError =
          'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
        window.alert(this.imageError);
        return;
      }
      if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        window.alert(this.imageError);
        return;
      }
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
  }

  setCategory(event: any, article: Article) {
    article.category = event.target.value;
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

  isLoggedIn(): boolean {
    return this.loginService.isLogged();
  }
}
