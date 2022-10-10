import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/User';
import { LoginService } from '../services/login.service';
import { NewsService } from '../services/news.service';

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
  searchText: string;
  @ViewChild('loginForm') loginForm: any;

  constructor(private loginService: LoginService, private newsService: NewsService) {
    this.user = { id_user: "", username: "", password: "" };
    this.article = { id: "", title: "", category: "", abstract: "", update_date: "" };
    this.searchText = "";
  }

  ngOnInit(): void {
    this.getArticles();
  }

  login() {
    this.loginService.login(this.user!.username, this.user!.password).subscribe(
      user => {
        this.user = user
        console.log(this.user);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong username or password!',
        });
      }
    )
  }

  isLoggedIn(): boolean {
    console.log(this.loginService.isLogged())
    return this.loginService.isLogged();
  }

  logout() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Logged out!',
          'You have logged out successfully!',
          'success'
        );
        this.loginService.logout();
        this.user = { id_user: "", username: "", password: "" }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'You have not logged out!',
          'error'
        )
      }
    })


  }

  getArticles() {
    this.newsService.getArticles().subscribe(
      list => {
        this.articlesList = list;
      }
    )
  }

  getArticle(id: number) {
    this.newsService.getArticle(id).subscribe(
      article => {
        this.article = article;
        console.log("ARTICLE" + article.id);
      }
    )
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


}
