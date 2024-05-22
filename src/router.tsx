import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/error/NotFound";
import WriteDetail from "./routes/WriteDetail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "writes/:wr_id",
        element: <WriteDetail />
      }
    ]
  }
]);


export default router;