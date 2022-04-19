import {useDispatch} from 'react-redux';
import { authLogout, purge } from '../../../actions/auth';

export const Header = () => {

    const dispatch = useDispatch();

    const handleOnLogout = () => {
        dispatch(purge());
        localStorage.clear();
        dispatch(authLogout());
    }

    return (
        <div className="main__bar">
            <img className="main__imagen" src="/logo-aranda.webp" alt="aranga-logo"></img>
            <div className="main__user">
                <div className="main__usercontent">
                    <p className="main__username">Bienvenido, Admin</p>
                </div>
                <div className="main__icons">
                    <button className="main__logout" onClick={handleOnLogout}>
                        <i className="fa-solid fa-right-from-bracket "></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
