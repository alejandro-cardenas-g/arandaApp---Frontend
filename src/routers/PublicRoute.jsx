import { Navigate } from "react-router-dom"

export const PublicRoute = ({children, isAuth}) => {
    return (

        (isAuth)
        ? <Navigate to='/'/>
        : children

    )
}
