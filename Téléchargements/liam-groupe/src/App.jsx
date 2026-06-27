import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Events from "./pages/Events";
import DomainsIndex from "./pages/DomainsIndex";
import Domain from "./pages/Domain";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function Layout() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Outlet />
    </ErrorBoundary>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/a-propos", element: <About /> },
      { path: "/actualites", element: <News /> },
      { path: "/evenements", element: <Events /> },
      { path: "/domaines", element: <DomainsIndex /> },
      { path: "/domaines/:slug", element: <Domain /> },
      { path: "/partenaires", element: <Partners /> },
      { path: "/contact", element: <Contact /> },
      { path: "/admin", element: <Admin /> },
      { path: "*", element: <Home /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
