import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainLayout from "../layout/MainLayout";

import ProductPage from "../pages/ProductPage";
import ErrorBoundary from "../pages/ErrorBoundary";
import Landing from "../pages/Landing";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import CheckOutPage from "../pages/user/CheckOut";
import OrderDetails from "../pages/user/OrderDetails";
import CartPage from "../pages/user/CartPage";
import UserProfile from "../pages/user/UserProfile";
import OrderHistory from "../pages/user/OrderHistory";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/home", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      //   { path: "forgot", element: <ForgotPasswordPage /> },
      //   { path: "product/:id", element: <ProductPage /> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: "/home", element: <HomePage /> },
      { path: "login", element: <Navigate to="/" /> },
      { path: "register", element: <Navigate to="/" /> },
      // { path: "about", element: <AboutPage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOutPage /> },
      { path: "order/:id", element: <OrderDetails /> },
      { path: "/orders", element: <OrderHistory /> },
      { path: "account", element: <UserProfile /> },
    ],
  },
]);

export default function AppRouter() {
  const { user } = useAuth();

  const finalRouter = !user?.id ? guestRouter : userRouter;

  return <RouterProvider router={finalRouter} />;
}
