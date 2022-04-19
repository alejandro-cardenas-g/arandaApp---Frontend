import { BrowserRouter,Routes,Route  } from "react-router-dom";
import { Login } from "../components/Auth/Page/Login";
import { MainRouter } from "./MainRouter";
import { useDispatch, useSelector } from 'react-redux';
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { useEffect } from "react";
import { startChecking } from "../actions/auth";

export const AppRouter = () => {

  const dispatch = useDispatch();
  const {id, checking} = useSelector( state => state.auth );

  useEffect(() => {
    
    dispatch(startChecking(localStorage.getItem("id")));

  }, [dispatch, id]);

  if(checking){
    return (<div>...Cargando</div>)
  }

  return (
    <BrowserRouter>

        <Routes>

            <Route path='/login' 
              element={ 
                <PublicRoute isAuth={!!id}>
                  <Login/>
                </PublicRoute>
              }
            />

            <Route path="*"
                element={
                  <PrivateRoute isAuth={!!id}>
                    <MainRouter/>
                  </PrivateRoute>
                }
            />

        </Routes>

    </BrowserRouter>
  )
}
