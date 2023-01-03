import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @HostBinding('class') cAppClass = 'c-app flex-row align-items-center';

  user = {
    userName: '',
    userPass: '',
    baseUrl: window.location.origin + '/'
  };

  constructor(private router: Router,  private authService: AuthService) { }
    ngOnInit() {
     
    }

  onLogin() {
    if (this.user.userName=='' || this.user.userPass==''){
      //this.mostrarMensaje();
    }else{
      this.authService.singUp(this.user)
      .subscribe(res => {
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
        err => {
          this.informarError(err.error);
          //alert(err.error.mensaje);
       }
      )
    }

  }  

  mostrarMensaje() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los campos Usuario y Contraseña Son Requeridos!',
    })
  }

  informarError(err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.mensaje,
    })
  }
}
