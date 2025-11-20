export enum FuelType{
    Petrol = 'Petrol',
    Hybrid = 'Hybrid',
    Diesel = 'Diesel',
    LPG = 'LPG',
};
export enum BodyType{
    Hatchback = "Hatchback",
    Sedan = "Sedan",
    Kombi = "Kombi",
    SUV = "SUV",
    Roadster = "Roadster"
}
export const BodyTypeMap: Record<number,BodyType>={
    0:BodyType.Hatchback,
    1:BodyType.Sedan,
    2:BodyType.Kombi,
    3:BodyType.SUV,
    4:BodyType.Roadster
}

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
    bodyType: BodyType
}