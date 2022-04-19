import { types } from "../types/types";

export const rolesUpdate = (id, nombre) => {
    return {
        type: types.roleUpdate,
        payload: {
            id,
            nombre
        }
    }
}