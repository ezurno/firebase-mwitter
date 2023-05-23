import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../routes/Auth";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const useRouter = (isLogin) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin ? (
        <>
          <Navigation />
          <Home />
        </>
      ) : (
        <Auth />
      ),
    },
    {
      path: "/edit-profile",
      element: (
        <>
          {isLogin ? <Navigation /> : null}
          <EditProfile />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          {isLogin ? <Navigation /> : null}
          <Profile />
        </>
      ),
    },
  ]);

  return router;
};

export default function Router({ isLogin }) {
  const router = useRouter(isLogin);

  return <RouterProvider router={router} />;
}
