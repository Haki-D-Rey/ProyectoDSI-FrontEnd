import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetalleReservacionM } from '../Modelos/DetalleReservacion';

@Injectable({
  providedIn: 'root'
})
export class ContenedorServiceService {
  AppUrlListar= '/DetalleReservacion/ListarDetalleReservacion';
  AppUrlListarFinalizada= '/DetalleReservacion/ListarDetalleReservacionFinalizada';
  constructor(public http: HttpClient) { }
  listaDetalle: DetalleReservacionM[]=[];
  listaDetalleFinalizada: DetalleReservacionM[]=[];

  obtenerDetalleReservacion(){
    this.http.get(`${environment.BASE_URL}`+'/DetalleReservacion/ListarDetalleReservacion').toPromise().then(data => { 
      this.listaDetalle = data as DetalleReservacionM[];
    })
  }

  obtenerDetalleReservacionFinalizada(){
    this.http.get(`${environment.BASE_URL}`+'/DetalleReservacion/ListarDetalleReservacionFinalizada').toPromise().then(data => { 
      this.listaDetalleFinalizada = data as DetalleReservacionM[];
    })
  }

}
