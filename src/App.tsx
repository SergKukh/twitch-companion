import { Navigate, Route, Routes } from "react-router-dom";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { privateRoutes, publicRoutes, RouteNames } from "./router";
import './App.scss';
import Menu from "./components/Menu/Menu";

function App() {
  const { isAuth } = useTypedSelector(state => state.auth);

  return (
    <>
      {
        isAuth ?
          <div className="container">
            <Menu />
            <Routes>
              {
                privateRoutes.map(route =>
                  <Route path={route.path} element={route.element} key={route.path} />)
              }
              < Route path="*" element={< Navigate to={RouteNames.MAIN} replace />} />
            </Routes>
          </div>
          :
          <Routes>
            {
              publicRoutes.map(route =>
                <Route path={route.path} element={route.element} key={route.path} />)
            }
            < Route path="*" element={< Navigate to={RouteNames.LOGIN} replace />} />
          </Routes >
      }
    </>
  );

}

export default App;