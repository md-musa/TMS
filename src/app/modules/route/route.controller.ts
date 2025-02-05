import { IRoute, Request, Response } from "express";
import { RouteService } from "./route.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const addRoute = async (req: Request, res: Response) => {
  const routeData: IRoute = req.body;
  const newRoute = await RouteService.create(routeData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Route created successfully",
    data: newRoute,
  })
};
const getRoutes = async (req: Request, res: Response) => {
  const routes = await RouteService.getRoutes();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Routes fetches successfully",
    data: routes,
  })
};

export const RouteController = {
  addRoute,
  getRoutes
};