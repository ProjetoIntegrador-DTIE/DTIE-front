import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>("https://dtie.herokuapp.com/postagem", this.token)
  }

  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`https://dtie.herokuapp.com/postagem/${id}`, this.token)
  }

  postPostagens(postagens: Postagem): Observable<Postagem>{
    this.spinner.show();
    return this.http.post<Postagem>("https://dtie.herokuapp.com/postagem", postagens, this.token).pipe(finalize(() => this.spinner.hide()))
  }

  putPostagens(postagens: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>("https://dtie.herokuapp.com/postagem", postagens, this.token)
  }

  deletePostagens(id: number){
    return this.http.delete(`https://dtie.herokuapp.com/postagem/${id}`, this.token)
  }
}
