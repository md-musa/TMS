import { IRoute } from "express";
import { RouteModel } from "./route.model";

const create = async (route: IRoute) => {
  const newRoute = await RouteModel.create(route);
  return newRoute;
};

export const RouteService = {
   create,
};
