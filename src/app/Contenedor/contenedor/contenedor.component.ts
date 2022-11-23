import { Component, OnInit } from '@angular/core';
import { ContenedorServiceService } from '../contenedor-service.service';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit {

  constructor(public servicio: ContenedorServiceService) { }

  ngOnInit(): void {
    this.servicio.obtenerDetalleReservacion();
    this.servicio.obtenerDetalleReservacionFinalizada();
  }


}
