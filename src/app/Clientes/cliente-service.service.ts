import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteM } from '../Modelos/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  AppUrlListar= '/Cliente/ListarCliente';
  AppUrlAgregar= '/Cliente/AgregarCliente';
  AppUrlEliminar= '/Cliente/EliminarCliente';
  AppUrlActualizar= '/Cliente/ActualizarCliente';

  constructor(public http: HttpClient) { }

  private actualizarForm = new BehaviorSubject<ClienteM>({} as any)
  lista: ClienteM[]=[];

  obtenerClientes(){
    this.http.get(`${environment.BASE_URL}`+'/Cliente/ListarCliente').toPromise().then(data => { 
      this.lista = data as ClienteM[];
    })
  }

  obtener$(): Observable<ClienteM>{
    return this.actualizarForm.asObservable();
  }

  actualizarFormulario (cliente: ClienteM){
    this.actualizarForm.next(cliente);
   }

  guardarCliente(cliente: ClienteM): Observable<ClienteM>{
   return this.http.post<ClienteM>(`${environment.BASE_URL}`+'/Cliente/AgregarCliente',cliente);
  }

  eliminarCliente(cliente: ClienteM):Observable<ClienteM> {
    return this.http.post<ClienteM>(`${environment.BASE_URL}`+this.AppUrlEliminar,cliente);
  }

  actualizarCliente (cliente: ClienteM): Observable<ClienteM> {
    return this.http.post<ClienteM>(`${environment.BASE_URL}`+'/Cliente/ActualizarCliente', cliente);
}



}
