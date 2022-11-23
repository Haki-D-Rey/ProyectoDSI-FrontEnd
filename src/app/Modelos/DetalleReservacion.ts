export  interface DetalleReservacionM {
    idDetalleReservacion:number,
    idReservacion: number,
    nombreCliente: string,
    apellidoCliente:string,
    nombreEmpleado:string,
    apellidoEmpleado:string,
    nombreServicio:string,
    precio: number,
    duracion:number,
    celular:string,
    idPago:string,
    fechaCreacion:Date,
    fechaAgendada:Date,
    idEstadoReservacion: string,
    mes:string,
    dia:string

}