import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext('app')
let didInit = false

function AppContextProvider(props) {
    const [init, setInit] = useState()
    const [authInfo, setAuthInfo] = useState()
    const [searchResults, setSearchResults] = useState({})
    useEffect(() => {
        if (didInit) return
        didInit = true
        const token = localStorage.getItem('token')
        const expire = localStorage.getItem('expire')
        if (token && expire) {
            setAuthInfo({ token, expire })
        }
        setInit(true)
    }, [])

    const onLogin = (authInfo) => {
        localStorage.setItem('token', authInfo.accessToken)
        localStorage.setItem('expire', authInfo.expire)
        setAuthInfo(authInfo)
    }

    const onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('expire')
        setAuthInfo(undefined)
    }

    const context = {
        authInfo,
        onLogin,
        onLogout,
        searchResults,
        setSearchResults,
    }
    return (
        <AppContext.Provider value={context}>
            {init && props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider

export function useAppContext() {
    return useContext(AppContext)
}
