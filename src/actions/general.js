import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const LoadContext = () => {

    return async(dispatch) => {

        try {

            let res = await fetchSinToken('roles', {});
            let body = await res.json();

            dispatch(GeneralloadRoles(body));
            
            res = await fetchSinToken('permisos', {});
            body = await res.json();

            dispatch(GeneralloadPermisos(body));
            
            res = await fetchSinToken('rolpermisos', {});
            body = await res.json();

            dispatch(GeneralloadRolpermisos(body));
            
            dispatch(generalLoadingFinish());

        } catch (error) {
            
            Swal.fire('Error', 'Error en el servidor: Volveremos en un momento.', 'error');
            
        }


    }

};

const GeneralloadRoles = (roles) => ({
    type: types.rolesLoad,
    payload: roles
});

const GeneralloadPermisos = (permisos) => ({
    type: types.permisosLoad,
    payload: permisos
})

const GeneralloadRolpermisos = (rolpermisos) => ({
    type: types.rpLoad,
    payload: rolpermisos
})

export const generalLoadingStart = () => ({
    type: types.startLoadingGeneral
});

const generalLoadingFinish = () => ({
    type: types.finishedLoadingGeneral
});