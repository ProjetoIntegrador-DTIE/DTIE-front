import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modal/Usuario';
import { UsuarioLogin } from '../modal/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>("https://dtie.herokuapp.com/usuarios/logar", usuarioLogin);
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>("https://dtie.herokuapp.com/usuarios/cadastrar", usuario);
  }

}
