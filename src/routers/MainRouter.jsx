import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import { generalLoadingStart, LoadContext } from "../actions/general"
import { Header } from "../components/Main/components/Header"
import { SideBar } from "../components/Main/components/SideBar"
import { Home } from "../components/Main/Page/Home"
import { Permisos } from "../components/Main/Page/Permisos"
import { Roles } from "../components/Main/Page/Roles"
import { Usuarios } from "../components/Main/Page/Usuarios"
import { getPermissionByRol } from "../helpers/filters"


export const MainRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(generalLoadingStart());
        dispatch(LoadContext());

    }, [dispatch])

    
    const {rol} = useSelector(state => state.auth);
    const {rolpermisos} = useSelector(state => state.rp);
    const {loadingGeneral} = useSelector(state => state.ui);

    if(loadingGeneral){
        return <h4>...Loading</h4>
    } 

    return (
        
        <main className="main">

            <Header/>

            <div className="card">

                <SideBar/>

                <div className="card__content">

                    <Routes>
                        
                        <Route path="" element={
                            (getPermissionByRol(rolpermisos, rol, 1)) ?
                            <Home/>
                            :
                            (!loadingGeneral) &&
                                <div style={{color:'red'}}>No tiene permisos suficientes para usar esta aplicación. Hable con el administrador si considera esto un error.</div>
                        }/>
                        <Route path="users" element={
                            (getPermissionByRol(rolpermisos, rol, 2)) ?
                            <Usuarios/>
                            : <Navigate to="/"/>
                        }/>
                        <Route path="roles" element={
                            (getPermissionByRol(rolpermisos, rol, 6)) ?
                            <Roles/>
                            : <Navigate to="/"/>
                        }/>
                        <Route path="permisos" element={
                            (getPermissionByRol(rolpermisos, rol, 7)) ?
                            <Permisos/>
                            : <Navigate to="/"/>

                        }/>
                        <Route path="*" element={<Navigate to="/"/>} />

                    </Routes>
                    
                </div>

            </div>



        </main>
        
    )
}
