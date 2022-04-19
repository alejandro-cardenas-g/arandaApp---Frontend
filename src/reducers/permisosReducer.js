import { types } from "../types/types";

// const permisos = [
//     {
//         id: 1,
//         nombre: 'Basico'
//     },
//     {
//         id: 2,
//         nombre: 'Basico - Usuarios'
//     },
//     {
//         id: 3,
//         nombre: 'Crear Usuario'
//     },
//     {
//         id: 4,
//         nombre: 'Editar Usuario'
//     },
//     {
//         id: 5,
//         nombre: 'Eliminar Usuario'
//     },
//     {
//         id: 6,
//         nombre: 'Admin - Roles'
//     },
//     {
//         id: 7,
//         nombre: 'Admin - Permisos'
//     }
// ]

const initialState = {
    permisos: []
};

export const permisosReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.permisosLoad:
            return {
                ...state,
                permisos: [...action.payload]
            };
    
        case types.permisosUpdate:
            return {
                permisos: state.permisos.map(permiso =>( 
                    (permiso.id === action.payload.id) ? {...permiso, nombre: action.payload.nombre} : permiso
                ))
            };

        case types.permisosPurge:
            return{
                ...initialState
            };

        default:
            return state;
    }

}
