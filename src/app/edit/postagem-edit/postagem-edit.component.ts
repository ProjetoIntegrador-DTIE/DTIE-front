import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
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

    let id = this.route.snapshot.params["id"]
    this.findByIdPostagem(id)
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) =>{
      this.postagem = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.postPostagens(this.postagem).subscribe({
      next: (resp: Postagem) => {
        this.postagem = resp
        this.alerta.showAlertSuccess("Postagem atualizada")
        this.router.navigate(["/postagem"])
      },
      error: erro => {
        if(erro.status == 500 || erro.status == 401 || erro.status == 400){
          this.alerta.showAlertWarning("Não foi possível cadastrar esta denúncia. Por favor, verifique os campos novamente.");
        }
      },
    });
  }

}
