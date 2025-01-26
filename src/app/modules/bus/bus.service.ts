import { IBus } from "./bus.interface";
import { BusModel } from "./bus.model"


const getBuses = async (): Promise<IBus[]> => {
     const buses = await BusModel.find();
     return buses;
}

const createBus = async (busInfo: IBus): Promise<IBus> => {
     const bus = await BusModel.create(busInfo);
     return bus;
}

export const BusService = { createBus, getBuses };