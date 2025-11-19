export enum FuelType{
    Petrol = 'Petrol',
    Hybrid = 'Hybrid',
    Diesel = 'Diesel',
    LPG = 'LPG',
};

export const FuelTypeMap: Record<number,FuelType>={
    0:FuelType.Petrol,
    1:FuelType.Hybrid,
    2:FuelType.Diesel,
    3:FuelType.LPG
};

export interface Car{
    id:string,
    brand:string,
    carFuelConsumption: number
    doorsNumber: number
    engineCapacity: number
    fuelType: FuelType
    luggageCapacity: number
    model: string
    productionDate: Date
}