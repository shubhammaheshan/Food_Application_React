import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Body from "./component/Body";
import { Header } from "./component/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./component/About";
import ResturantMenu from "./component/ResturantMenu";
import Help from "./component/Help";
import Error from "./component/Error";
import { Provider } from "react-redux";
import store from "./store";

const AppLayout = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />

        <Outlet />
      </div>
    </Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/restaurant/:id",
        element: <ResturantMenu />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
