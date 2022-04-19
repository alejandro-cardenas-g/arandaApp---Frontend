import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
import { permisosReducer } from './permisosReducer';
import { rolesReducer } from './rolesReducer';
import { rolpermisionReducer } from './rolpermisionReducer';
import { uiReducer } from './uiReducer';
import { usuarioReducer } from './usuarioReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    usuario: usuarioReducer,
    roles: rolesReducer,
    permisos: permisosReducer,
    rp: rolpermisionReducer
});