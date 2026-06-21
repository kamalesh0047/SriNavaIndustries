import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { WorkPage } from "./pages/WorkPage";
import { MachineryDetailPage } from "./pages/MachineryDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "work", Component: WorkPage },
      { path: "work/machinery/:name", Component: MachineryDetailPage },
    ],
  },
]);
