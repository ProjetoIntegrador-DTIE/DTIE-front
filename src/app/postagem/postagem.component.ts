import { Component, OnInit } from '@angular/core';
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
    private cepService: ViacepService,
  ) { }

  ngOnInit(){
  }

  getCep(){
    this.cepService.getCep(this.postagem.cep).subscribe((resp: any) => {
      this.postagem.endereco = resp.logradouro;
      
    })
  }


}
