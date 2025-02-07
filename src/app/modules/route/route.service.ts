import { IRoute } from "express";
import { RouteModel } from "./route.model";

const create = async (route: IRoute) => {
  const newRoute = await RouteModel.create(route);
  return newRoute;
};

const getRoutes = async () => {
  const routes = await RouteModel.find();
  return routes;
};

export const RouteService = {
   create,
   getRoutes
};
