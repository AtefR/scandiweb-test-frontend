import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./app.scss";
import Root from "./routes/root";
import Products, { loader as rootLoader, action as deleteAction } from "./routes/products";
import AddProduct, { action as createAction } from "./routes/add-product";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: rootLoader,
        Component: Products,
        action: deleteAction,
      },
      {
        path: "add-product",
        element: <AddProduct />,
        action: createAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
