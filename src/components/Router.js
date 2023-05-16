import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../routes/Auth";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

const useRouter = ({ isLogin }) => {
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

export default function Router({ isLogin }) {
  const router = useRouter(isLogin);

  return <RouterProvider router={router} />;
}
