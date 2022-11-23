import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicioM } from '../Modelos/ServicioM';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  UrlListar= '/Servicio/ListarServicios';
  UrlAgregar= '/servicio/AgregarServicio';
  UrlEliminar= '/servicio/EliminarServicio';
  UrlActualizar= '/servicio/ActualizarServicio';
  private actualizarForm = new BehaviorSubject<ServicioM>({} as any)
  lista: ServicioM[]=[];

  constructor(public http: HttpClient) { }

  obtenerServicios(){
    this.http.get(`${environment.BASE_URL}`+this.UrlListar).toPromise().then(data => { 
      this.lista = data as ServicioM[];
    })
  }

  obtener$(): Observable<ServicioM>{
    return this.actualizarForm.asObservable();
  }

  actualizarFormulario (servicio: ServicioM){
    this.actualizarForm.next(servicio);
   }

  guardarServicio(servicio: ServicioM): Observable<ServicioM>{
   return this.http.post<ServicioM>(`${environment.BASE_URL}`+this.UrlAgregar,servicio);
  }

  eliminarServicio(servicio: ServicioM):Observable<ServicioM> {
    return this.http.post<ServicioM>(`${environment.BASE_URL}`+this.UrlEliminar,servicio);
  }

  actualizarServicio(servicio: ServicioM): Observable<ServicioM> {
    return this.http.post<ServicioM>(`${environment.BASE_URL}`+this.UrlActualizar, servicio);
}

}