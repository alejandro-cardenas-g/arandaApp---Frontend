export const ListadoRoles = ({rol, handleOnChange}) => {
  return (
    <label className="label-apart">
        <input className="label-apart-input" type="radio" id={rol.nombre}  value={rol.id} name="rol" onChange={handleOnChange}/>
        {rol.nombre}
    </label>
  )
}
