export interface DroneModelDTO {
    id: number;
    droneBrandId: number;
    modelName: string;
    seedCapacityKg: number;
    coverageHectaresPerDay: number;
    autonomyMinutes: number;
    maxSpeedKmh: number;
}