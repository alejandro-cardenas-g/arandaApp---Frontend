import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { uiOpenModal } from "../../../../actions/ui";
import { usuarioSetActive, usuarioStartDelete } from "../../../../actions/usuarios";
import { getPermissionByRol } from "../../../../helpers/filters";

export const ListadoUsuarios = ({usuario}) => {
    
    const {rol} = useSelector(state => state.auth);
    const {rolpermisos} = useSelector(state => state.rp);
    
    const dispatch = useDispatch();

    const onEditUser = () => {
        dispatch(usuarioSetActive(usuario));
        dispatch(uiOpenModal())
    }

    const onDeleteUser = () => {
    
        Swal.fire({
            title: 'Cuidado!',
            text: "Si eliminas este registro no podrás recuperarlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(usuarioStartDelete(usuario.id));
            }
          })

    }

    return (
        <div 
            className="line animate__animated animate__fadeIn"
        >

            <div className="usercard">
                <h5> {usuario.fullName}</h5>
                <p>Dirección:  <span>{usuario.direccion}</span></p>
                <p>Teléfono: <span>{usuario.telefono}</span></p>
            </div>
            <div className="botones">
                {
                    (!!getPermissionByRol(rolpermisos,rol, 4)) &&
                    <button className="btn btn-2 btn-w" onClick={onEditUser}>Editar</button>
                }
                {
                    (!!getPermissionByRol(rolpermisos,rol, 5)) &&
                    <button className="btn btn-3 btn-w" onClick={onDeleteUser}>Eliminar</button>
                }

            </div>

        </div>
    )
}
