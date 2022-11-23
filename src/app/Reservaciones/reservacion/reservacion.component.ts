import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ReservacionM } from 'src/app/Modelos/reservacionM';
import { ReservacionMSave } from 'src/app/Modelos/reservacionMSave';
import { ReservacionServiceService } from '../reservacion-service.service';
import { MatDialog  } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {

  constructor(public servicio: ReservacionServiceService, public dialog: MatDialog, private toasr: ToastrService) { 
    this.form = this.CreateFormGroup();
  }

  CreateFormGroup(){
    return new FormGroup ({
      idReservacion: new FormControl(),
      idCliente: new FormControl('',[Validators.required]),
      idPago: new FormControl(''),
      idEstadoReservacion: new FormControl(''),
      fechaAgendada: new FormControl('',[Validators.required]),
    });
  }

  form : FormGroup;
  reservacionSeleccionado?: ReservacionM;
  idReservacion = 0;
  filterPost='';


  ngOnInit(): void {
    this.servicio.obtenerReservacion();
    this.servicio.obtener$().subscribe(data =>{
      console.log(data);
      this.reservacionSeleccionado=data;
      this.form.patchValue({
        idReservacion:this.reservacionSeleccionado.idReservacion,
        idCliente: this.reservacionSeleccionado.idCliente,
        idPago: this.reservacionSeleccionado.idPago,
        idEstadoReservacion: this.reservacionSeleccionado.idEstadoReservacion,
        primerApellido: this.reservacionSeleccionado.primerApellido,
        celular: this.reservacionSeleccionado.celular,
        fechaAgendada : this.reservacionSeleccionado.fechaAgendada,
        mes : this.reservacionSeleccionado.mes,
        dia : this.reservacionSeleccionado.dia,
      })
      this.idReservacion = this.reservacionSeleccionado.idReservacion;
    }) 
  }

  guardarReservacion() {
    const reservacion : ReservacionMSave = {
    idReservacion : 0,
    idCliente : JSON.parse(this.form.get('idCliente')?.value),
    idPago : this.form.get('idPago')?.value,
    idEstadoReservacion : this.form.get('idEstadoReservacion')?.value,
    fechaAgendada : this.form.get('fechaAgendada')?.value,
  }
  this.servicio.guardarReservacion(reservacion).subscribe(data=>{
    this.toasr.success('Reservación agregada','Exitoso');
    this.servicio.obtenerReservacion();
    this.form.reset();
  });
}

  actualizarReservacion(reservacion: ReservacionM){
    this.servicio.actualizarFormulario(reservacion);
    }

  GuardarOActualizar(){
    if(this.idReservacion === 0 || this.idReservacion=== undefined){
      this.guardarReservacion();
      this.servicio.obtenerReservacion();
    }
    else{
       this.Actualizar();
       console.log('actualizado con éxito');
    }
   }
  
   eliminarReservacion(reservacion: ReservacionM){
    this.servicio.eliminarReservacion(reservacion).subscribe(data =>{
      console.log('eliminado');
      this.servicio.obtenerReservacion();
    });
  }
  Actualizar(){
    const reservacion : ReservacionMSave = {
    idReservacion : this.idReservacion,
    idCliente : JSON.parse(this.form.get('idCliente')?.value),
    idPago : this.form.get('idPago')?.value,
    idEstadoReservacion :this.form.get('idEstadoReservacion')?.value,
    fechaAgendada : this.form.get('fechaAgendada')?.value,
  }
 
    this.servicio.actualizarReservacion(reservacion).subscribe(data =>{
      this.servicio.obtenerReservacion();
    });
    this.idReservacion=0;
    this.form.reset();

  }

  
  page_size : number = 8
  page_number: number = 1
  pageSizeOptions = [5,10,15]

  handlePage(e: PageEvent){
    this.page_size= e.pageSize;
    this.page_number = e.pageIndex + 1
  }

  pagos = [
    {
      estado: "Tarjeta"
    },
    {
      estado: "Efectivo"
    }
  ]

  estadosReservacion = [
    {
      estado: "Activa"
    },
    {
      estado: "Finalizada"
    },
    {
      estado: "Cancelada"
    }
  ]

 }

  



