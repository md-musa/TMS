import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { IBus } from './bus.interface';
import { BusService } from './bus.service';


const getBuses = async (req: Request, res: Response) => {
  const buses = await BusService.getBuses();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Buses are fetched successfully',
    data: buses,
  });
}

const createBus = async (req: Request, res: Response) => {
  const busInfo: IBus = req.body;

  const bus = await BusService.createBus(busInfo);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Bus created successfully',
    data: bus,
  });
} // make class for send response

export const BusController = {
  createBus,
  getBuses
};