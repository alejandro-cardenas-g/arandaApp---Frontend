import { types } from "../types/types";

// const usuarios = [
//     {
//         id: 1,
//         username: 'Andres', 
//         password: '213123', 
//         fullName: 'Andrés Gaviria', 
//         direccion: 'Carrera 8b #13', 
//         telefono: 3123123131, 
//         email: 'asdada@sdasdada.com', 
//         edad: 22,
//         rol: 1
//     },
//     {
//         id: 2,
//         username: 'Juan', 
//         password: '213123', 
//         fullName: 'Juan Guarnizo', 
//         direccion: 'Carrera 8b #13', 
//         telefono: 3123123131, 
//         email: 'asdada@sdasdada.com', 
//         edad: 22,
//         rol: 2
//     },
//     {
//         id: 3,
//         username: 'Pedro', 
//         password: '213123', 
//         fullName: 'Pedro Gaviria', 
//         direccion: 'Carrera 8b #13', 
//         telefono: 3123123131, 
//         email: 'asdada@sdasdada.com', 
//         edad: 22,
//         rol: 3
//     },
//     {
//         id: 4,
//         username: 'Sebas', 
//         password: '213123', 
//         fullName: 'Sebastian Ochoa', 
//         direccion: 'Carrera 8b #13', 
//         telefono: 3123123131, 
//         email: 'asdada@sdasdada.com', 
//         edad: 22,
//         rol: 4
//     }

// ];

const initialState = {
    usuarios: [],
    activo: null
};

export const usuarioReducer = (state= initialState, action) => {

    switch (action.type) {
        case types.usuariosLoad:
            return {
                ...state,
                usuarios: [...action.payload]
            };
            
        
        case types.usuarioSetActive:
            return{
                ...state,
                activo: action.payload
            };

        case types.usuarioSetInactive:
            return{
                ...state,
                activo: null
            };

        case types.usuarioCreate:
            return{
                ...state,
                usuarios: [
                    ...state.usuarios,
                    action.payload
                ]
            }

        case types.usuarioUpdate:
            return{
                ...state,
                usuarios: state.usuarios.map(usuario => {
                    return usuario.id === action.payload.id ? action.payload.usuario : usuario;
                })
            };
        
        case types.usuarioDelete:
            return{
                ...state,
                usuarios: state.usuarios.filter(usuario => usuario.id !== action.payload)
            }

        case types.usuariosPurge:
            return{
                ...initialState
            };

        default:
            return state;
    }

}