import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../routes/Auth";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

import { useState } from "react";

const useRouter = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin ? <Home /> : <Auth />,
    },
    {
      path: "/edit-profile",
      element: <EditProfile />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return router;
};

export default function Router() {
  const router = useRouter();

  return <RouterProvider router={router} />;
}
