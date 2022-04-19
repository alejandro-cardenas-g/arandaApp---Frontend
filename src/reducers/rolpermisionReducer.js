import { types } from "../types/types";

// const rolpermisos = [
//     {
//         id: 1,
//         idrol: 4,
//         idpermiso: 1
//     },
//     {
//         id: 2,
//         idrol: 4,
//         idpermiso: 2
//     },
//     {
//         id: 3,
//         idrol: 4,
//         idpermiso: 3
//     },
//     {
//         id: 4,
//         idrol: 4,
//         idpermiso: 4
//     },
//     {
//         id: 5,
//         idrol: 4,
//         idpermiso: 5
//     },
//     {
//         id: 6,
//         idrol: 4,
//         idpermiso: 6
//     },
//     {
//         id: 7,
//         idrol: 4,
//         idpermiso: 7
//     }
// ]

const initialState = {
    rolpermisos: []
};

export const rolpermisionReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.rpLoad:
            return {
                ...state,
                rolpermisos: [...action.payload]
            };

        case types.rpAdd:
            return {
                ...state, 
                rolpermisos: [...state.rolpermisos, action.payload]
            };

        case types.rpRemove:
            return {
                ...state,
                rolpermisos: state.rolpermisos.filter(rolpermiso => rolpermiso.id !== action.payload)
            };

        case types.rpPurge:
            return{
                ...initialState
            };

        default:
            return state;
    }

}
