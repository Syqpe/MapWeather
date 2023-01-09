import { FC, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Suspense } from "@components/";

import { Error } from "./error";

const Home = lazy(() => import("./home"));
const Whois = lazy(() => import("./whois"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense>
                <Home />
            </Suspense>
        ),
        errorElement: <Error />,
    },
    {
        path: "/whois",
        element: (
            <Suspense>
                <Whois />
            </Suspense>
        ),
        errorElement: <Error />,
    },
]);

export const Routing: FC = function () {
    return <RouterProvider router={router} />;
};
