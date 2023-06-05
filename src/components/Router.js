import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const useRouter = (isLogin, userObj, refreshUser) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin ? (
        <>
          <Navigation userObj={userObj} />
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
          {isLogin ? <Navigation userObj={userObj} /> : null}
          <Profile userObj={userObj} refreshUser={refreshUser} />
        </>
      ),
    },
  ]);

  return router;
};

export default function Router({ isLogin, userObj, refreshUser }) {
  const router = useRouter(isLogin, userObj, refreshUser);

  return <RouterProvider router={router} />;
}
