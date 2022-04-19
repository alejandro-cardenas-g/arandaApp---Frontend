import Modal from 'react-modal';
import {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../../../actions/ui';
import { usuarioSetInactive, usuarioStartCrear, usuarioStartUpdate } from '../../../../actions/usuarios';
import { useForm } from '../../hooks/useForm';

if(process.env.NODE_ENV !== "test"){
    Modal.setAppElement("#root");
}

const styles = {
    content: {

        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '50%',
        transform: 'translate(-50%,50%)'
    }
}

export const UsuarioModal = () => {

    const dispatch = useDispatch();
    const {modalOpen} = useSelector( state => state.ui );
    const { activo } = useSelector(state => state.usuario);
    const { roles } = useSelector(state => state.roles);

    const initialValues = useRef({
        direccion: '',
        edad: "",
        email: "",
        fullName: "",
        password: "",
        telefono: "",
        username: "",
        rol: roles[0].id
    });

    const [values, handleChange, setValues] = useForm(initialValues.current);

    useEffect(() => {

        if(activo){
            setValues(prev => activo);
        }else{
            setValues(prev => initialValues.current);
        }

    }, [activo, setValues,initialValues]);

    const [passwordeye, setPasswordEye] = useState(false);

    const handleOnEyePassword = () => {
        setPasswordEye(prev => !prev);
    }

    const closeModal = () => {
        dispatch(usuarioSetInactive());
        dispatch(uiCloseModal());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!!activo){
            dispatch(usuarioStartUpdate(values.id,{...values}));
            dispatch(uiCloseModal());
            return;
        }
        
        dispatch(usuarioStartCrear({...values}));
        dispatch(uiCloseModal());
    }

    return (
        
        <Modal
            styles={styles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
            ariaHideApp={(!process.env.NODE_ENV === 'test') && false}
            isOpen={modalOpen}
            onRequestClose={closeModal}
        >
            <div className="modal__header">
                <h1 className="modal__titulo">{`${!!activo ? 'Editar Usuario' : 'Crear Usuario'}`}</h1>
                <button className="btn btn-dark" onClick={closeModal}>Atras</button>
            </div>
            <hr/>

            <form className="form-l" onSubmit={handleSubmit}>

                <div className="form-l__control">
                    <label className="form-l__label">Username</label>
                    <input className="form-l__input" placeholder="username" type="text" value={values.username} name="username" onChange={handleChange} required/>
                </div>
                <div className="form-l__control">
                    <label className="form-l__label">Nombre completo</label>
                    <input className="form-l__input" placeholder="Nombre completo" type="text" value={values.fullName || ''} name="fullName" onChange={handleChange} required/>
                </div>
                <div className="form-l__control">
                    <label className="form-l__label">Dirección</label>
                    <input className="form-l__input" placeholder="Dirección" type="text" name="direccion" value={values.direccion || ''} onChange={handleChange} required/>
                </div>
                <div className="form-l__control">
                    <label className="form-l__label">Teléfono</label>
                    <input className="form-l__input" placeholder="Teléfono" type="text" name="telefono" value={values.telefono} onChange={handleChange} required/>
                </div>
                <div className="form-l__control">
                    <label className="form-l__label">Edad</label>
                    <input className="form-l__input" placeholder="Edad" type="number" name="edad" value={values.edad || ''} onChange={handleChange} required/>
                </div>
                <div className="form-l__control">
                    <label className="form-l__label">Rol</label>
                    <select name="rol" value={values.rol} onChange={handleChange} >
                        {
                            roles.map(rol => (
                                <option value={rol.id} key={rol.id}>
                                    {rol.nombre}
                                </option>
                            ))
                        }
                    </select>
                    {/* <input className="form-l__input" placeholder="Rol" type="text" name="rol" required/> */}
                </div>
                <div className="form-l__control">
                    <label className="form-l__label">Correo electrónico</label>
                    <input className="form-l__input" placeholder="Correo electrónico" type="email" name="email" value={values.email || ''} onChange={handleChange} required/>
                </div>
                <div className="form-l__control mb-2">
                    <label className="form-l__label">Password <i style={{cursor: 'pointer'}} onClick={handleOnEyePassword} className="fa-solid fa-eye"></i></label>
                    <input className="form-l__input" placeholder="Contraseña" type={`${(passwordeye ? 'text' : 'password')}`} name="password"  onChange={handleChange} value={values.password || ''}/>
                </div>
                <div className="form-l__control">
                    <button className="btn">{ activo ? 'Editar Usuario' : 'Crear Usuario'}</button>
                </div>


            </form>

        </Modal>

    )

}
