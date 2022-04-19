export const types = {

    //login

    authLogin: '[Auth] Auth Login',
    authLogout: '[Auth] Auth Logout',
    authPurge: '[Auth] Purge',
    authCheck: '[Auth] Check',

    //Modal UI

    uiOpenModal: '[UI] Open Modal',
    uiCloseModal: '[UI] Close Modal',
    startLoadingGeneral: '[UI] Start Loading Gen',
    finishedLoadingGeneral: '[UI], Finish Loading Gen',
    uiPurge: '[UI] Purge',
    
    //Usuarios

    usuariosLoad: '[User] Load Users',
    usuarioCreate: '[User] Create',
    usuarioUpdate: '[User] Update',
    usuarioDelete: '[User] Delete',
    usuarioSetActive: '[User] SetActive',
    usuarioSetInactive: '[User] SetInactive',

    usuariosStartLoading: '[User] Start Loading',
    usuariosPurge: '[User] Purge',

    //roles

    rolesLoad: '[Role] Load',
    roleUpdate: '[Role] Update',
    rolePurge: '[Role] Purge',

    //Permisos

    permisosLoad: '[Permisos] Load',
    permisosUpdate: '[Permisos] Update',
    permisosPurge: '[Permisos] Purge',

    //RolPermiso

    rpLoad: '[RP] Load',
    rpAdd: '[RP] Add',
    rpRemove: '[RP] Remove',
    rpPurge: '[RP] Purge'

}