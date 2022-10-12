import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/User';
import { LoginService } from '../services/login.service';
import { NewsService } from '../services/news.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  user: User | null;
  isLogged: boolean = false;
  articlesList: Article[] = [];
  article: Article;
  category: string;
  searchText: string;
  @ViewChild('loginForm') loginForm: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private newsService: NewsService) {
    this.user = { id_user: "", username: "", password: "" };
    this.article = { id: "", title: "", category: "", abstract: "", update_date: "" };
    this.searchText = "";
    this.category = "";
  }

  ngOnInit(): void {
    this.getArticles();
  }

  isLoggedIn(): boolean {
    return this.loginService.isLogged();
  }

  getArticles() {
    const category = this.route.snapshot.paramMap.get("category");
    console.log(category);
    this.newsService.getArticles().subscribe(
      list => {
        if (category != null)
          this.articlesList = list.filter(article => (article.category === category));
        else
          this.articlesList = list
      }
    )
  }

  toArticleDetail(id: number) {
    this.router.navigate([`/articles/${id}`])
  }

  deleteArticle(article: Article): void {
    console.log(article);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Article has been successfully deleted!',
          'success'
        );
        this.newsService.deleteArticle(article).subscribe(
          _ => {
            this.getArticles();
            console.log("DELETED");
          },
          err => {
            console.log("ERROR");
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Article not deleted!',
          'error'
        )
      }
    })
  }

  setCategory(category: string): void {
    this.category = category;
  }

  editArticle(id: Number): void {
    this.router.navigate([`/article/edit/${id}`])
  }

  createArticle(): void {
    this.router.navigate([`/article/create`])
  }
}
