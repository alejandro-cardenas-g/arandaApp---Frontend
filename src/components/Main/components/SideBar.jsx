import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getPermissionByRol } from "../../../helpers/filters";

export const SideBar = () => {

    const {rol} = useSelector(state => state.auth);
    const {rolpermisos} = useSelector(state => state.rp);
    

    return (
        <aside className="card__sidebar">

            {
                (!!getPermissionByRol(rolpermisos,rol, 1)) &&
                <div className="">
                    <NavLink to='/' className="card__link card__item">Inicio</NavLink>
                </div>
            }
            {
                (!!getPermissionByRol(rolpermisos,rol, 2)) &&
                <div className="">
                    <NavLink to='/users' className="card__link card__item">Usuarios</NavLink>
                </div>
            }
            {
                (!!getPermissionByRol(rolpermisos,rol, 6)) &&
                <div className="">
                    <NavLink to='/roles' className="card__link card__item">Roles</NavLink>
                </div>
            }
            {
                (!!getPermissionByRol(rolpermisos,rol, 7)) &&
                <div className="">
                    <NavLink to='/permisos' className="card__link card__item">Permisos</NavLink>
                </div>
            }

        </aside>
    )
}
