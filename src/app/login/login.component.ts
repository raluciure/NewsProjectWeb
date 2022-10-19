import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../interfaces/User';
import { LoginService } from '../services/login.service';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User | null;

  constructor(private loginService: LoginService, private router: Router, private newsService: NewsService) {
    this.user = { id_user: "", username: "", password: "", apiKey: "" };
  }
  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.loginService.isLogged();
  }

  login() {
    this.loginService.login(this.user!.username, this.user!.password).subscribe(
      user => {
        this.user = user;
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
        this.user = { id_user: "", username: "", password: "", apiKey: "" };
        this.newsService.setAnonymousApiKey();
        this.router.navigate([`/articles`]);
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
}
