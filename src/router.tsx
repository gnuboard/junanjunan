import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/error/NotFound";
import WriteDetail from "./routes/WriteDetail";
import WriteUpdate from "./routes/WriteUpdate";
import WriteCreate from "./routes/WriteCreate";


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
        path: "writes/create",
        element: <WriteCreate />
      },
      {
        path: "writes/:wr_id",
        element: <WriteDetail />
      },
      {
        path: "writes/:wr_id/update",
        element: <WriteUpdate />
      },
    ]
  }
]);


export default router;