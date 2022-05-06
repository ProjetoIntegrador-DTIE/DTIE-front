import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../modal/Usuario';
import { UsuarioLogin } from '../modal/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuariorLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>("https://dtie.herokuapp.com/usuarios/logar", usuariorLogin);
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>("https://dtie.herokuapp.com/usuarios/cadastrar", usuario);
  }

  logado(){
    let ok: boolean = false;
    if(environment.token != ""){
      ok = true;
    }
    return ok;
  }

}
