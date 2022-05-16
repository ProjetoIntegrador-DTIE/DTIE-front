import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmarSenha: string;

  emailValido: boolean = true

  txtEmail = (<HTMLDivElement>document.querySelector('#usuario'))

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll (0,0);
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value;
  }

  validaEmail() {
    let regex = /.+\@.+\..+/
    if(this.usuario.usuario.match(regex)) {
      let txtEmail = (<HTMLDivElement>document.querySelector('#usuario'))
      txtEmail.classList.remove("is-invalid");
      txtEmail.classList.add("is-valid")
      this.emailValido = false
    } else {
      let txtEmail = (<HTMLDivElement>document.querySelector('#usuario'))
      txtEmail.classList.remove("is-valid");
      txtEmail.classList.add("is-invalid");
      this.emailValido = true
    }
  }



  cadastrar(){
    if(this.usuario.senha != this.confirmarSenha){
      alert("A senha está incorreta!");
    }else if(this.emailValido){
      alert("E-mail invalido")
    }else{
      this.authService.cadastrar(this.usuario).subscribe({
        next: (resp: Usuario) => {
          this.usuario = resp
          this.router.navigate(["/login"])
          alert("Usuário cadastrado com sucesso!")
        },
        error: erro => {
          if(erro.status == 500 || erro.status == 401 || erro.status == 400){
            alert("Usuário já existe");
          }
        },
      });
    }
  }

}

