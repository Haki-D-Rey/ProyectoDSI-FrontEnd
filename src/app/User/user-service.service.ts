import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioM } from '../Modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(public http: HttpClient) { }
  UrlAcceder = "/Usuario/Login"
  lista: UsuarioM[]=[];

  obtenerUsuario(){
    this.http.get(`${environment.BASE_URL}`+'/Usuario/ListarUsuario').toPromise().then(data => { 
      this.lista = data as UsuarioM[];
    })
  }

  Login(user: UsuarioM):Observable<UsuarioM> {
    return this.http.post<UsuarioM>(`${environment.BASE_URL}`+this.UrlAcceder,user);
  }

}
