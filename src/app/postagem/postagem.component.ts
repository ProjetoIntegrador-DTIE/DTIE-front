import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../modal/Postagem';
import { ViacepService } from '../service/viacep.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  postagem: Postagem = new Postagem();

  constructor(
    private router: Router,
    private cepService: ViacepService,
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ""){
      alert("Sua sessão expirou, faça o login novamente")
      this.router.navigate([""])
    }
  }

  getCep(){
    this.cepService.getCep(this.postagem.cep).subscribe((resp: any) => {
      this.postagem.endereco = resp.logradouro;

    })
  }


}
