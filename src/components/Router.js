import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const useRouter = (isLogin, userObj) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin ? (
        <>
          <Navigation />
          <Home userObj={userObj} />
        </>
      ) : (
        <Auth />
      ),
    },
    // {
    //   path: "/edit-profile",
    //   element: (
    //     <>
    //       {isLogin ? <Navigation /> : null}
    //       <EditProfile />
    //     </>
    //   ),
    // },
    {
      path: "/profile",
      element: (
        <>
          {isLogin ? <Navigation /> : null}
          <Profile userObj={userObj} />
        </>
      ),
    },
  ]);

  return router;
};

export default function Router({ isLogin, userObj }) {
  const router = useRouter(isLogin, userObj);

  return <RouterProvider router={router} />;
}
