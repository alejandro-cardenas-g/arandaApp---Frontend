import { LoginForm } from "../components/LoginForm"

export const Login = () => {

    return (

        <main className="login">

            <img className="login__imagen" src="/logo-aranda.webp" alt="aranga-logo"></img>

            <div className="login__container">

                <div className="login__box">

                    <LoginForm/>

                </div>

            </div>

        </main>

    )
}
