import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from './interfaces/User';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EITWEbNews';

  user: User | null;
  searchText: string;

  constructor(private loginService: LoginService) {
    this.user = { id_user: "", username: "", password: "" };
    this.searchText = "";
  }

  isLoggedIn(): boolean {
    console.log(this.loginService.isLogged())
    return this.loginService.isLogged();
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

}
