import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { ViacepService } from '../service/viacep.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  user: Usuario = new Usuario()
  idUser = environment.id

  mensagem = document.querySelector(".mensagemValidar");
  textMensagem = document.querySelector(".textMensagem");
  contador = 0;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ""){
      alert("Sua seção expirou, faça o login novamente")
      this.router.navigate(["/login"])
    }
    this.authService.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){ // execulta uma lista de temas
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario) =>{
      this.user = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    console.log(this.postagem)

    this.postagemService.postPostagens(this.postagem).subscribe((resp: Postagem) =>{
      this.postagem = resp
      alert("Postagem realizada com sucesso")
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

  // validarMensagem(){
  //   this.contador = this.mensagem
  //   this.textMensagem.innerHTML = "Numero de caracter " + this.contador + "/100";

  //   if (this.mensagem.value.length > 100) {
  //     this.mensagem.classList.add("is-invalid");
  //     this.mensagemOk = false;
  //    } else {
  //     this.mensagem.classList.remove("is-invalid");
  //     this.mensagemOk = true;
  //    }
  // }

  pesquisar(){
    this.tema.id = this.idTema
    this.findByIdTema()
  }


}
