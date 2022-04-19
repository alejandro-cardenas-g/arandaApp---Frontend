export const AnyItem = ({item, setEdit, buttonShow="Editar"}) => {

    const showComponent = (e) => {
        setEdit(prev => ({
            ...prev,
            onShow: true,
            value: item.nombre,
            current: item.nombre,
            id: item.id
        }));

    }

    return (
        <div className="rol-card line animate__animated animate__fadeIn">

            <h5 className="rol-card__titulo"> <i className="fa-solid fa-user-gear"> </i>  {item.nombre}</h5>

            <div className="rol-card__buttons">

                <button className="btn btn-2 btn-w" onClick={() => showComponent()} >{buttonShow}</button>

            </div>

        </div>
    )
}
