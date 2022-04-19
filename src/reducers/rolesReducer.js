import { types } from "../types/types";

// const roles = [
//     {
//         id: 1,
//         nombre: 'Visitante'
//     },
//     {
//         id: 2,
//         nombre: 'Asistente'  
//     },
//     {
//         id: 3,
//         nombre: 'Editor'   
//     },
//     {
//         id: 4,
//         nombre: 'Administrador'
//     },

// ];

const initialState = {
    roles: []
} 

export const rolesReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.rolesLoad:
            return {
                ...state,
                roles: [...action.payload]
            };

        case types.roleUpdate:
            return {
                roles: state.roles.map(rol =>( 
                    (rol.id === action.payload.id) ? {...rol, nombre: action.payload.nombre} : rol
                ))
            }

        case types.rolePurge:
            return{
                ...initialState
            };
    
        default:
            return state;
    }

}
