import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/error/NotFound";
import WriteDetail from "./routes/WriteDetail";
import WriteUpdate from "./routes/WriteUpdate";
import WriteCreate from "./routes/WriteCreate";
import WriteList from "./routes/WriteList";


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
        path: "writes/:bo_table",
        element: <WriteList />
      },
      {
        path: "writes/:bo_table/:wr_id",
        element: <WriteDetail />
      },
      {
        path: "writes/:bo_table/:wr_id/update",
        element: <WriteUpdate />
      },
    ]
  }
]);


export default router;