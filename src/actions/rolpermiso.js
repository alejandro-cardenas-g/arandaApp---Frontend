import { types } from "../types/types";

export const rolpermisoAdd = (idrol, idpermiso) => {
    return{
        type: types.rpAdd,
        payload: {
            id: Math.floor(Math.random()*100),
            idrol,
            idpermiso
        }
    }
};

export const rolpermisoRemove = (rpid) => ({
    type: types.rpRemove,
    payload: rpid
});
