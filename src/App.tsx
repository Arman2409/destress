import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./styles/globals.scss";
import { routes } from "./utils/data";
import type { RouteData } from "./types/shared";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({
          key,
          path,
          component
        }: RouteData) => <Route
            key={key}
            path={path}
            Component={component} />)
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
