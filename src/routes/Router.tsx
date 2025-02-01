import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "@/routes/page/Home";
import Layout from "@/layout/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
