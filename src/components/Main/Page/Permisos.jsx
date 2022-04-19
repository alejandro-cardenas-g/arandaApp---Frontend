import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { permisosUpdate } from "../../../actions/permisos";
import { rolpermisoAdd, rolpermisoRemove } from "../../../actions/rolpermiso";
import { filtersPermisionByRol, filtersPermisionByRolN, getRolPermissionByParams } from "../../../helpers/filters";
import { AnyItem } from "../components/roles/AnyItem";

export const Permisos = () => {
    
    const dispatch = useDispatch();
    const {permisos} = useSelector( state => state.permisos );
    const {roles} = useSelector(state => state.roles);
    const {rolpermisos} = useSelector(state => state.rp);

    const [showSelected, setShowSelected] = useState({
        onShowFirst: false,
        onShowSecond: false
    });

    const initialState = {
        nombreRol: '',
        value: '',
        onShow: false,
        current: '',
        id: null
    }

    const [showForm1, setShowForm1] = useState(initialState);
    const [showForm2, setShowForm2] = useState(initialState);
 
    const [selectrp, setSelectRp] = useState(0);

    const rolpermisosFiltered =  useMemo(
        () => filtersPermisionByRolN(rolpermisos, permisos,showForm2.id),
        [rolpermisos, showForm2, permisos]
    );
    
    const rolpermisosFiltered2 = useMemo(
        () => filtersPermisionByRol(rolpermisos, permisos , showForm2.id),
        [rolpermisos, showForm2, permisos]
    );

    const handleShowSelected = (seccion) => {
        if(seccion === 1){
            setShowSelected(prev => ({
                ...prev,
                onShowFirst: !prev.onShowFirst
            }));
            setShowForm1(prev => initialState);
        }else{
            setShowSelected(prev => ({
                ...prev,
                onShowSecond: !prev.onShowSecond
            }));
            setShowForm2(prev => initialState);
        }
    };

    const onClose = (seccion) => {
        if(seccion === 1){
            setShowForm1(initialState);
        }else{
            setShowForm2(initialState);
        }

      }
    
    const onSave = (seccion) => {
        if(seccion === 1){
            dispatch(permisosUpdate(showForm1.id, showForm1.value));
            setShowForm1(initialState);
        }else{
            setShowForm2(initialState);
        }
    };

    const handleOnChangeForm1 = (e) => {
        setShowForm1(prev => ({
            ...prev,
            value: e.target.value
        }))
    }

    const onRemoveRP = (idpermiso) => {
        const rpToRemove = getRolPermissionByParams(rolpermisos, idpermiso, showForm2.id);
        dispatch(rolpermisoRemove(rpToRemove.id));
    }

    const handleSelectonChange = (e) => {
        setSelectRp(e.target.value);
    }

    const onAddRP = (e) => {
        e.preventDefault();
        if(selectrp > 0){
            dispatch(rolpermisoAdd(showForm2.id,parseInt(selectrp)));
        }
    }

    return (
        <div className="permisos">

            <h2 className="permisos__titulo">Administración de Permisos</h2>
            
            <div className="permisos__seccion permisos__seccion-bb">

                <div className="permisos__header">

                    <button className="permisos__button-icon" onClick={() => handleShowSelected(1)}>
                        {/* <i class="fa-solid fa-angle-up"></i> */}
                        <i className={`permisos__icon ${showSelected.onShowFirst ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'}`}></i>
                    </button>
                    
                    <h4 className="permisos__header-titulo">
                        Permisos
                    </h4>

                </div>
                {
                    (showForm1.onShow && showSelected.onShowFirst) &&
                    <>
                        <form className="form dark-bg animate__animated animate__fadeIn mt-2">
                            <div className="div-close">
                                <h4>Permiso: {showForm1.current}</h4>
                                <i className="closeButton fa-solid fa-xmark" onClick={() => onClose(1)}></i>
                            </div>
                
                            <div className="form-s__control mb-2">
                                <label htmlFor="rolname" className="form__label" >Permiso</label>
                                <input className="form__input" 
                                    style={{
                                        maxWidth: '80%'
                                    }}
                                    type="text" name="rolname" placeholder="Nombre del rol" 
                                    value={showForm1.value}
                                    onChange={handleOnChangeForm1}
                                />
                                <button className="save--button-icon" onClick={() => onSave(1)}><i className="fa-solid fa-floppy-disk"></i></button>
                            </div>
                        </form>
                    </>

                }
                {
                    (showSelected.onShowFirst) &&
                    <div className="permisos__info">

                        {
                            permisos.map(permiso => (
                                <AnyItem key={permiso.id} item={permiso} setEdit={setShowForm1} />
                            ))
                        }

                    </div>
                }

            </div>
            <div className="permisos__seccion">

                <div className="permisos__header">

                    <button className="permisos__button-icon" onClick={() => handleShowSelected(2)}>
                        {/* <i class="fa-solid fa-angle-up"></i> */}
                        <i className={`permisos__icon ${showSelected.onShowSecond ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'}`}></i>
                    </button>
                    
                    <h4 className="permisos__header-titulo">
                        Asignación de permisos
                    </h4>

                </div>
                {
                        (showForm2.onShow && showSelected.onShowSecond) &&
                        <>
                            <form className="form dark-bg animate__animated animate__fadeIn mt-2" onSubmit={onAddRP}>
                                <div className="div-close">
                                    <h4>Permisos - Rol: {showForm2.current}</h4>
                                    <i className="closeButton fa-solid fa-xmark" onClick={() => onClose(2)}></i>
                                </div>
                    
                                <div className="form-s__control mb-2">

                                    {(rolpermisosFiltered.length > 0) ?
                                        <>
                                            <label htmlFor="rolname" className="form__label" >Permiso</label>
                                            <select className="form__select" name="rp" value={selectrp.value} onChange={handleSelectonChange} defaultValue={0}>
                                                <option value={0}>---- Seleccione Un Permiso ----</option>
                                                {
                                                    rolpermisosFiltered.map(permiso => (
                                                        <option key={permiso.id} value={permiso.id}>{ permiso.nombre }</option>
                                                    ))
                                                }

                                            </select>
                                            <button type="submit" className="save--button-icon"><i className="fa-solid fa-plus"></i></button>

                                        </>
                                        :
                                        <h4>No hay permisos asignables</h4>
                                    }
                                </div>

                                <div>

                                    {
                                        rolpermisosFiltered2.map(permiso => (
                                            <div className="div-close div--close-atc" key={permiso.id}>
                                                <p>{ permiso.nombre }</p>
                                                <i className="closeButton fa-solid fa-xmark" onClick={() => onRemoveRP(permiso.id)}></i>
                                            </div>
                                        ))
                                    }

                                </div>

                            </form>
                        </>

                }
                {
                    (showSelected.onShowSecond) &&

                    <div className="permisos__info">

                        {
                            roles.map(rol => (
                                <AnyItem key={rol.id} item={rol} buttonShow={'Permisos'} setEdit={setShowForm2}/>
                            ))
                        }

                    </div>
                }
            </div>

        </div>
    )
}
