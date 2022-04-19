import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { rolesUpdate } from '../../../actions/roles';
import { AnyItem } from '../components/roles/AnyItem';

export const Roles = () => {
  
  const {roles} = useSelector(state => state.roles);
  const dispatch = useDispatch();

  const initialState = {
    nombreRol: '',
    value: '',
    onShow: false,
    current: '',
    id: null
  }

  const [editRol, setEditRol] = useState(initialState);

  const onChange = (e) => {
    setEditRol(prev => ({
      ...prev,
      value: e.target.value
    }))
  };

  const onClose = (e) => {
  
    setEditRol(initialState);
  }

  const onSave = (e) => {
    dispatch(rolesUpdate(editRol.id, editRol.value));
    setEditRol(initialState);
  }
  
  return (

      <div className="roles">

        <h2 className="roles__titulo">Administración de Roles</h2>
        {
          (editRol.onShow) &&
          <form className="form dark-bg animate__animated animate__fadeIn">
            <div className="div-close">
              <h4>Editar: {editRol.current}</h4>
              <i className="closeButton fa-solid fa-xmark" onClick={onClose}></i>
            </div>

            <div className="form-s__control mb-2">
                <label htmlFor="rolname" className="form__label" >Rol</label>
                <input className="form__input" 
                    style={{
                      maxWidth: '80%'
                    }}
                    type="text" name="rolname" placeholder="Nombre del rol" 
                    value={editRol.value}
                    onChange={onChange}
                />
                <button className="save--button-icon" onClick={onSave}><i className="fa-solid fa-floppy-disk"></i></button>
            </div>
          </form>
        }
        {
          roles.map(rol => (
            <AnyItem key={`${rol.id}`} item={rol} setEdit={setEditRol} />
          ))
        }

      </div>

    )
}
