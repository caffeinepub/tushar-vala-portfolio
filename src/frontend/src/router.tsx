import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import App from "./App";
import AdventureWorksPage from "./pages/AdventureWorksPage";
import BrightFutureSchoolPage from "./pages/BrightFutureSchoolPage";
import CarSalesPage from "./pages/CarSalesPage";
import SalesReportPage from "./pages/SalesReportPage";
import VeloraRetailsPage from "./pages/VeloraRetailsPage";
import ZomatoPage from "./pages/ZomatoPage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const salesReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/sales-report",
  component: SalesReportPage,
});

const brightFutureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/bright-future-school",
  component: BrightFutureSchoolPage,
});

const veloraRetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/velora-retails",
  component: VeloraRetailsPage,
});

const carSalesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/car-sales",
  component: CarSalesPage,
});

const adventureWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/adventureworks",
  component: AdventureWorksPage,
});

const zomatoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/zomato",
  component: ZomatoPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  salesReportRoute,
  brightFutureRoute,
  veloraRetailsRoute,
  carSalesRoute,
  adventureWorksRoute,
  zomatoRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
