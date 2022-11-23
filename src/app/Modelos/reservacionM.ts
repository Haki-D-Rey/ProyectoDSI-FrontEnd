export  interface ReservacionM {


    idReservacion: number;
    idCliente:number;
    idPago: string;
    idEstadoReservacion: string;
    primerNombre: string;
    primerApellido: string;
    celular: string;
    fechaCreacion: Date;
    fechaAgendada: Date;
    mes: string;
    dia: string;   
    
}