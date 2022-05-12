import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ""){
      alert("Sua seção expirou, faça o login novamente")
      this.router.navigate(["/login"])
    }
    let id = this.route.snapshot.params["id"]
    this.findByIdTema(id)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  deletar(){
    this.temaService.deleteTema(this.tema.id).subscribe(() =>{
      alert("Tema Deletado")
      this.router.navigate(["/tema"])
    })
  }

}
