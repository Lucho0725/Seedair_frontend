export interface DroneModelListDTO {
    id:number,
    brandName: string;
    modelName: string;
    seedCapacityKg: number;
    coverageHectaresPerDay: number;
    autonomyMinutes: number;
    maxSpeedKmh: number;
}