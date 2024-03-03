import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoggedIn } from "./redux-toolkit/ReducerMain"

export const EmployeeLogout = () => {
    const navigateTo = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=> {
        if(localStorage.getItem('tokenRedux')!==null) {
            dispatch(setLoggedIn(false))
            localStorage.removeItem('tokenRedux')
            navigateTo("/")
        }
    }, [dispatch, navigateTo])
}
