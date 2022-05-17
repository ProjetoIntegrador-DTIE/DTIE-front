import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {  }

  validaEmail() {
    let regex = /.+\@.+\..+/
    if(this.usuarioLogin.usuario.match(regex)) {
      let txtEmail = (<HTMLDivElement>document.querySelector('#usuario'))
      txtEmail.classList.remove("is-invalid");
      txtEmail.classList.add("is-valid")
    } else {
      let txtEmail = (<HTMLDivElement>document.querySelector('#usuario'))
      txtEmail.classList.remove("is-valid");
      txtEmail.classList.add("is-invalid");
    }
  }

  entrar(){
    this.auth.login(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp

        environment.id = this.usuarioLogin.id;
        environment.nome = this.usuarioLogin.nome;
        environment.foto = this.usuarioLogin.foto;
        environment.token = this.usuarioLogin.token;
        environment.tipo = this.usuarioLogin.tipo;

        console.log(this.usuarioLogin)

        this.router.navigate(["/postagem"])
      },
      error: erro => {
        if(erro.status == 500 || erro.status == 401){
          alert("Usuário ou senha incorretos");
        }
      },
    });
  }
}
