import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Verificacao } from '../model/Verificacao';

@Injectable({
  providedIn: 'root'
})
export class VerificacaoService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllVerificacao(): Observable<Verificacao[]>{
    return this.http.get<Verificacao[]>("https://dtie.herokuapp.com/verificacao", this.token)
  }

  getByIdVerificacao(id: number): Observable<Verificacao>{
    return this.http.get<Verificacao>(`https://dtie.herokuapp.com/verificacao/${id}`, this.token)
  }

  postVerificacao(verificacao: Verificacao): Observable<Verificacao>{
    return this.http.post<Verificacao>("https://dtie.herokuapp.com/verificacao", verificacao, this.token)
  }

  putVerificacao(verificacao: Verificacao): Observable<Verificacao>{
    return this.http.put<Verificacao>("https://dtie.herokuapp.com/verificacao", verificacao, this.token)
  }

  deleteVerificacao(id: number){
    return this.http.delete(`https://dtie.herokuapp.com/verificacao/${id}`, this.token)
  }
}
