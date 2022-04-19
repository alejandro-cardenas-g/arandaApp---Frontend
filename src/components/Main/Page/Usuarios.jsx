import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { getPermissionByRol, getUserByName } from '../../../helpers/filters';
import { ListadoUsuarios } from '../components/usuarios/ListadoUsuarios';
import { ListadoRoles } from '../components/usuarios/ListadoRoles';
import { UsuarioModal } from '../components/usuarios/UsuarioModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../../actions/ui';
import { usuariosStartLoading } from '../../../actions/usuarios';

export const Usuarios = () => {

    const dispatch = useDispatch();

    const {usuarios} = useSelector( state => state.usuario );
    const {roles} = useSelector( state => state.roles );
    const {rol} = useSelector(state => state.auth);
    const {rolpermisos} = useSelector(state => state.rp);

    const navigate = useNavigate();
    
    const location = useLocation();

    const {q = '', s = ''} = queryString.parse(location.search);

    const [search, setSearch] = useState({search: q, rol: s});

    const usuariosFiltered = useMemo(() => getUserByName(usuarios, q,s), [q,s, usuarios]);

    useEffect(() => {

        dispatch(usuariosStartLoading());

    }, [dispatch]);

    const handleOnChange = ({target}) => {
        // navigate(`?q=${target.value}`);
        setSearch(prev => ({...prev, [target.name]: target.value}));
    };

    const handleSubmitRol = (e) => {
        e.preventDefault();
        navigate(`?q=${search.search}&s=${search.rol}`);
    };
    
    const openModal = (e) => {
        dispatch(uiOpenModal());
    }

    return (
        <div>

            <div>
                {
                    (!!getPermissionByRol(rolpermisos,rol, 3)) &&
                    <button className="btn btn-1 mb-2" onClick={openModal}>Crear Usuario</button>
                }

                {/* <button onClick={() => navigate("/roles")}>aaa</button> */}

                
                <form onSubmit={handleSubmitRol} className="form__user mb-2">

                    <h4>Filtros de búsqueda</h4>

                    <input className="filterinput mb-2" value={search.search} name="search" placeholder="Buscar" onChange={handleOnChange}/>
                    
                    <fieldset className="mb-2 filterfielset">
                        <legend>Escoge un rol</legend>
                        {
                            roles.map(rol => (
                                
                                <ListadoRoles key={rol.id} rol={rol} handleOnChange={handleOnChange}/>

                            ))
                        }
                        <label className="label-apart">
                            <input className="label-apart-input" type="radio" id="option__cualquiera" value={0} name="rol" onChange={handleOnChange}/>
                            {'Cualquiera'}
                        </label>

                    </fieldset>

                    <button type="submit" className="btn btn-dark">Buscar</button>
                </form>

            </div>
           
            {
                usuariosFiltered.map(usuario => (

                    <ListadoUsuarios key={usuario.id} usuario={usuario}/>

                ))
            }

            <UsuarioModal/>

        </div>
    )
}
