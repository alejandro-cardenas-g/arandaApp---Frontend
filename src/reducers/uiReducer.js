import {types} from '../types/types';

const initialState = {
    modalOpen: false,
    loadingGeneral: false,
};

export const uiReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case types.uiOpenModal:
            return{
                ...state,
                modalOpen: true
            };
    
        case types.uiCloseModal:
            return{
                ...state,
                modalOpen: false
            };

        case types.startLoadingGeneral:
            return{
                ...state,
                loadingGeneral: true
            }

        case types.finishedLoadingGeneral:
            return{
                ...state,
                loadingGeneral: false
            }
        
        case types.uiPurge:
            return {
                ...initialState
            }

        default:
            return state;
    }

}
