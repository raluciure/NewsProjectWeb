import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('loginForm') loginForm: any;

  constructor(private loginService: LoginService, private newsService: NewsService) {
    this.user = { id_user: "", username: "", password: "" };
  }

  ngOnInit(): void {
    this.getArticles();
  }

  login() {
    this.loginService.login(this.user!.username, this.user!.password).subscribe(
      user => {
        this.user = user
        console.log(this.user);
      }
    )
  }

  isLoggedIn(): boolean {
    console.log(this.loginService.isLogged())
    return this.loginService.isLogged();
  }

  logout() {
    this.loginService.logout();
    this.loginForm.reset();
  }

  getArticles() {
    this.newsService.getArticles().subscribe(
      list => {
          this.articlesList = list;
      }
    )
  }
}
