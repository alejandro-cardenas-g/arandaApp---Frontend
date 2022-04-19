export const getUserByName = (usuarios, name, rol) => {
    let rola = rol;
    if(rol === '0'){
        return usuarios.filter( usuario => usuario.fullName.toLowerCase().includes(name.toLowerCase()));
    }else{
        return usuarios.filter( usuario => usuario.fullName.toLowerCase().includes(name.toLowerCase()) && usuario.rol.toString().includes(rola.toString()));
    }
}

export const getPermissionByRol = (rolpermisos, idrol, idpermiso) => {
    if(!!idrol){
        return rolpermisos.find(rp => rp.idRol === idrol && rp.idPermiso === idpermiso);
    }
    return null;
}

export const getRolPermissionByParams = (rolepermisos, idpermiso, idrol) => {
    if(!!idrol){
        return rolepermisos.find(rp => rp.idRol === idrol && rp.idPermiso === idpermiso);
    }
    return null;

}

//Retornar los permisos que un rol tiene ya asignado
export const filtersPermisionByRol = (rolpermissions ,permisos, idrol) => {
    if(!!idrol){
        const rolpermisosByRol = rolpermissions.filter(rp => rp.idRol === idrol);
        let permisosReturn = [];

        if(rolpermisosByRol.length > 0){
            permisos.forEach(permiso => {
                if(!!rolpermisosByRol.find(rp => rp.idPermiso === permiso.id)){
                    permisosReturn = [...permisosReturn, permiso];
                }
    
            });
    
            return permisosReturn;
        }else{
            return [];
        }

    }
    return [];

}

//Retornar los permisos no asignados que tiene un rol
export const filtersPermisionByRolN = (rolpermissions, permisos, idrol) => {
    if(!!idrol){
        const rolpermisosByRol = rolpermissions.filter(rp => rp.idRol === idrol);
        let permisosReturn = [];

        if(rolpermisosByRol.length > 0){ //Este rol no tiene ningún permiso
            permisos.forEach(permiso => {
                if(!rolpermisosByRol.find(rp => rp.idPermiso === permiso.id)){
                    permisosReturn = [...permisosReturn, permiso];
                }
            });
    
            return permisosReturn;
        }else{
            return permisos;
        }


    }
    return [];

}