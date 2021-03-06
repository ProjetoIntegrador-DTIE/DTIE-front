import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Cep } from '../model/Cep';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
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

  contador: number = 0;

  cep: Cep = new Cep()

  key = "date"
  reverse = true

  urgente: boolean
  urgenciaPT: string = "Não";

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private viaCep: ViacepService,
    private alerta: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ""){
      this.alerta.showAlertDanger("Sua sessão expirou, faça o login novamente")
      this.router.navigate(["/login"])
    }
    this.authService.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()

  }

  getAllTemas(){
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

  validarCep(){
    if(this.postagem.cep.length >= 8){
      this.viaCep.getCep(this.postagem.cep).subscribe((resp: Cep) => {
        this.cep = resp
      })
      this.postagem.endereco = this.cep.logradouro
      this.postagem.complemento = this.cep.complemento
      this.postagem.ufNome = this.cep.localidade //Nome da cidade
      this.postagem.ufSigla = this.cep.uf
    }
  }

  contagem(){
    this.contador = this.postagem.texto.length
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagem.urgencia = this.urgenciaPT

    this.postagemService.postPostagens(this.postagem).subscribe({
      next: (resp: Postagem) => {
        this.postagem = resp
        this.alerta.showAlertSuccess("Denúncia realizada com sucesso")
        this.postagem = new Postagem()
        this.getAllPostagens()
      },
      error: erro => {
        if(erro.status == 500 || erro.status == 401 || erro.status == 400){
          this.alerta.showAlertWarning("Não foi possível cadastrar esta denúncia. Por favor, verifique os campos novamente.");
        }
      },
    });

  }

  pesquisar(){
    this.tema.id = this.idTema
    this.findByIdTema()
  }

  urgencia(){
    if (this.urgente) {
      this.urgenciaPT = "Não"
    } else {
      this.urgenciaPT = "Sim"
    }

  }

}
