import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservacionM } from '../Modelos/reservacionM';
import { ReservacionMSave } from '../Modelos/reservacionMSave';

@Injectable({
  providedIn: 'root'
})
export class ReservacionServiceService {

  AppUrlListar= '/Reservacion/ListarReservacion';
  AppUrlAgregar= '/Reservacion/AgregarReservacion';
  AppUrlEliminar= '/Reservacion/EliminarReservacion';
  AppUrlActualizar= '/Reservacion/ActualizarReservacion';

 constructor(public http: HttpClient) { }

 private actualizarForm = new BehaviorSubject<ReservacionM>({} as any)
 lista: ReservacionM[]=[];

 obtenerReservacion(){
  this.http.get(`${environment.BASE_URL}`+this.AppUrlListar).toPromise().then(data => { 
    this.lista = data as ReservacionM[];
  })
}

obtener$(): Observable<ReservacionM>{
  return this.actualizarForm.asObservable();
}


actualizarFormulario (reservacion: ReservacionM){
  this.actualizarForm.next(reservacion);
 }

 
 guardarReservacion(reservacion: ReservacionMSave): Observable<ReservacionMSave>{
  return this.http.post<ReservacionMSave>(`${environment.BASE_URL}`+this.AppUrlAgregar,reservacion);
 }

 eliminarReservacion(reservacion: ReservacionM):Observable<ReservacionM> {
   return this.http.post<ReservacionM>(`${environment.BASE_URL}`+this.AppUrlEliminar,reservacion);
 }

 actualizarReservacion (reservacion: ReservacionMSave): Observable<ReservacionMSave> {
   return this.http.post<ReservacionMSave>(`${environment.BASE_URL}`+this.AppUrlActualizar, reservacion);
}

}
