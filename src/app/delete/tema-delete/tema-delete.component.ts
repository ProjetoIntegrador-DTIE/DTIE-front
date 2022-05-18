import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
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
    private route: ActivatedRoute,
    private alerta: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ""){
      this.alerta.showAlertDanger("Sua sessão expirou, faça o login novamente")
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
      this.alerta.showAlertSuccess("Categoria apagada")
      this.router.navigate(["/tema"])
    })
  }

}
