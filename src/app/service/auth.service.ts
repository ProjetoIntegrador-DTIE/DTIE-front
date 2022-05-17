import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
    ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set("Authorization", environment.token)
    }
  }

  login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    this.spinner.show();
    return this.http.post<UsuarioLogin>("https://dtie.herokuapp.com/usuarios/logar", usuarioLogin).pipe(finalize(() => this.spinner.hide()));
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    this.spinner.show();
    return this.http.post<Usuario>("https://dtie.herokuapp.com/usuarios/cadastrar", usuario).pipe(finalize(() => this.spinner.hide()));
  }

  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://dtie.herokuapp.com/usuarios/${id}`, this.token)
  }

  logado(){
    let ok: boolean = false;
    if(environment.token != ""){
      ok = true;
    }
    return ok;
  }
  adm(){
    let ok: boolean = false;
    console.log(ok)
    console.log(environment)
    if(environment.tipo === "adm"){
      ok = true;
      console.log(ok)
    }
    return ok;
  }
}
