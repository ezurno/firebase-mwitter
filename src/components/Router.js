import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import SignUp from "../routes/SignUp";

const useRouter = (isLogin, userObj, refreshUser) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin ? (
        <>
          <Navigation userObj={userObj} />
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Home userObj={userObj} />
          </div>
        </>
      ) : (
        <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Auth />
        </div>
      ),
    },
    {
      path: "/login",
      element: isLogin ? (
        <>
          <Navigation userObj={userObj} />
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Home userObj={userObj} />
          </div>
        </>
      ) : (
        <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SignUp />
        </div>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          {isLogin ? <Navigation userObj={userObj} /> : null}
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Profile userObj={userObj} refreshUser={refreshUser} />
          </div>
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
