import { types } from "../types/types"
import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import Swal from "sweetalert2";

export const startLogin = (email, password) => {

    return async(dispatch) => {
        
        try{
            const res = await fetchSinToken('auth', {email, password}, 'POST');
        
            const body = await res.json();
    
            if(body.ok){
                localStorage.setItem('token', body.token);
                localStorage.setItem('id', body.data.id);
                localStorage.setItem('token-init-date', new Date().getTime());
    
                dispatch(authLogin(body.data.id, body.data.username, body.data.rol));
    
            }else{
                Swal.fire('Error', body.error, 'error');
            }
    
        }catch(e){
            Swal.fire('Error', 'Error en el servidor: Volveremos en un momento.', 'error');
        }

    }

}

export const startChecking = (id) => {

    return async(dispatch) => {
        

        try{

            const res = await fetchConToken(`auth/${id}`, {});
            const body = await res.json();

            if(body.ok){
                localStorage.setItem('token', body.token);
                localStorage.setItem('id', body.data.id);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(authLogin(body.data.id, body.data.username, body.data.rol));
                // 
            }else{
                //Swal.fire('Error', body.error, 'error');
                dispatch(startCheck());
            }


        }catch(e)
        {
            Swal.fire('Error', 'Error en el servidor: Volveremos en un momento.', 'error');
        }

    }

} 

const startCheck = () => ({
    type: types.authCheck
});

export const authLogin = (id, username, rol) => {
    return {
        type: types.authLogin,
        payload: {
            id,
            username,
            rol
        }
    };
}

export const authLogout = () => {
    return{
        type: types.authLogout
    }
}

export const purge = () => {

    return async(dispatch) => {

        dispatch({
            type: types.authPurge
        });
        dispatch({
            type: types.rpPurge
        });
        dispatch({
            type: types.uiPurge
        });
        dispatch({
            type: types.rolePurge
        });
        dispatch({
            type: types.usuariosPurge
        });
        dispatch({
            type: types.permisosPurge
        });

    }

}