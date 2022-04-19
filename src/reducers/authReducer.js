import { types } from '../types/types';

const initialState = { 
    id: null,
    rol: null,
    username: null,
    checking: true
};

export const authReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            };
        
        case types.authLogout:
            return {
                checking: false
            };

        case types.authCheck:
            return{
                ...state,
                checking: false
            }

        default:
            return state;
    }

}
