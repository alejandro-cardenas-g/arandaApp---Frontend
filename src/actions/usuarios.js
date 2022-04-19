import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const usuariosStartLoading = () => {
    return async(dispatch) => {

        try{

            const res = await fetchSinToken('usuarios', {});
            const body = await res.json();

            dispatch(usuariosLoading(body));

        }catch(e){
            Swal.fire('Error', 'Error en el servidor: Volveremos en un momento.', 'error');
        }
    }
}

export const usuarioStartCrear = (usuario) => {
    return async(dispatch) => {

        try{

            const res = await fetchSinToken('usuarios', usuario, 'POST');
            const body = await res.json();
            
            if(body.ok){
                
                dispatch(usuarioCrear(body.data));

            }else{

                if(body.type && body.errors && body.status){
                    Swal.fire('Error','Error al mandar el formulario, por favor revisa los datos.', 'error');
                }else{
                    Swal.fire('Error', body.error , 'error');
                }

            }

        }catch(e){
            Swal.fire('Error', 'Error en el servidor: Volveremos en un momento.', 'error');
        }

    }
}

export const usuarioStartUpdate = (id, usuario) => {

    return async(dispatch) => {

        try{

            const res = await fetchSinToken(`usuarios/${id}`, usuario, 'PUT');
            const body = await res.json();
            if(body.ok){
                dispatch(usuarioActualizar(body.data.id,body.data));

            }else{

                if(body.type && body.errors && body.status){
                    Swal.fire('Error','Error al mandar el formulario, por favor revisa los datos.', 'error');
                }else{
                    Swal.fire('Error', body.error , 'error');
                }

            }

        }catch(e){
            Swal.fire('Error', 'Error en el servidor: Volveremos en un momento.', 'error');
        }

    }

} 

export const usuarioStartDelete = (id) => {
    return async(dispatch) => {

        try{

            const res = await fetchSinToken(`usuarios/${id}`, {}, 'DELETE');
            const body = await res.json();
            if(body.ok){

                dispatch(usuarioEliminar(body.data.id));
                Swal.fire(
                    'Eliminado!',
                    'El registro ha sido eliminado',
                    'success'
                )

            }else{
                
                if(body.error){
                    Swal.fire('Error', body.error , 'error');
                }else{
                    Swal.fire('Error', 'Ocurrió un error al eliminar el registro' , 'error');
                }


            }

        }catch(e){
            Swal.fire('Error', 'Error en el servidor: Volveremos en un momento.', 'error');
        }

    }
}

const usuariosLoading = (usuarios) => ({
    type: types.usuariosLoad,
    payload: usuarios
})

export const usuarioSetActive = (usuario) => {
    return{
        type: types.usuarioSetActive,
        payload: usuario
    }
}

export const usuarioSetInactive = () => {
    return{
        type: types.usuarioSetInactive
    };
}

export const usuarioCrear = (usuario) => {
    return{
        type: types.usuarioCreate,
        payload: usuario
    }
}

export const usuarioActualizar = (id, usuario) => {
    return{
        type: types.usuarioUpdate,
        payload: {
            id,
            usuario
        }
    }
}

export const usuarioEliminar = (id) => {
    return{
        type: types.usuarioDelete,
        payload: id
    }
}