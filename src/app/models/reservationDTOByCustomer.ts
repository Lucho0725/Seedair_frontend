export interface ReservationDTOByCustomer {


    id: number;
    scheduledStartDate: string; 
    scheduledEndDate: string;
    
    hectares: number;
    totalAmount: number;

    state: 'PENDIENTE' | 'FINALIZADO' | 'CANCELADO';

    parcelLocation: string;
    operatorId: number;
    droneModel: string;

    paymentId?: number;
    reviewRating?: number;

}