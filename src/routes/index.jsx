import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./page/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
