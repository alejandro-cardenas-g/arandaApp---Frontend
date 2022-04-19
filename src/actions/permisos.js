import {types} from '../types/types';

export const permisosUpdate = (id, nombre) => (
    {
        type: types.permisosUpdate,
        payload: {
            id,
            nombre
        }
    }
)
