import { useAppContext } from '../AppContext/AppContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function AuthorizationHOC(props) {
    const { authInfo } = useAppContext()
    const navigate = useNavigate()
    useEffect(() => {
        if (!authInfo) {
            navigate('/')
        }
    }, [authInfo, navigate])

    return authInfo ? props.children : null
}

export default AuthorizationHOC
