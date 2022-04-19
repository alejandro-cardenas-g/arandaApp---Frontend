import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import { startLogin } from '../../../actions/auth';

export const LoginForm = () => {

    const dispatch = useDispatch();

    const loginSchema = Yup.object().shape({
        email: Yup.string().required('Este campo es requerido').email('Correo Inválido'),
        password: Yup.string().required('Este campo es requerido')
    });

    const formik = useFormik({
        initialValues:{
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        validateOnChange: false,
        onSubmit: (formData) => {
            
            dispatch(startLogin(formData.email, formData.password));

        }
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
                        
            <h2 className="login__titulo">Iniciar Sesión</h2>

            <div className="form__control">
                <label htmlFor="email" className="form__label">Correo</label>
                <input className="form__input" 
                    type="text" name="email" placeholder="Correo electrónico" 
                    onChange={formik.handleChange}
                    value={formik.values.email || ''}
                />
                { formik.errors.email  && <div className="form__error animate__animated animate__fadeInUp">{formik.errors.email}</div>}
            </div>
            
            <div className="form__control">
                <label htmlFor="password" className="form__label">Password</label>
                <input className="form__input" type="password" name="password" placeholder="Contraseña" 
                    onChange={formik.handleChange}
                    value={formik.values.password || ''}
                />
                { formik.errors.password  && <div className="form__error animate__animated animate__fadeInUp">{formik.errors.password}</div>}
            </div>

            <div className="form__control form__control--button">
                <button type="submit" className="form__button">Iniciar Sesión</button>
            </div>

        </form>
    )
}
