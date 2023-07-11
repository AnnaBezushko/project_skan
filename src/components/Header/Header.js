import css from './Header.module.scss'
import logo from './img/logo.svg'
import avatar from './img/img.png'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../AppContext/AppContext'
import { useEffect, useState } from 'react'
import api from '../../api'
import classNames from 'classnames'
import MobileMenu from './MobileMenu/MobileMenu'

export function Header() {
    const { authInfo } = useAppContext()
    const [showMenu, setShowMenu] = useState()
    return (
        <header className={css.header}>
            <img src={logo} />
            <div className={css.menu}>
                <NavLink className={css.menuItem} to="/">
                    Главная
                </NavLink>
                <div className={css.menuItem}>Тарифы</div>
                <div className={css.menuItem}>FAQ</div>
            </div>
            {authInfo ? <UserBlock /> : <AuthBlock />}
            <div
                className={css.mobileMenu}
                onClick={() => {
                    setShowMenu(true)
                }}
            />
            {showMenu && (
                <MobileMenu
                    close={() => {
                        setShowMenu(false)
                    }}
                />
            )}
        </header>
    )
}

function AuthBlock() {
    return (
        <div className={css.authBlock}>
            <NavLink className={css.register} to="/auth">
                Зарегистрироваться
            </NavLink>
            <div className={css.break} />
            <NavLink className={css.login} to="/auth">
                Войти
            </NavLink>
        </div>
    )
}

function UserBlock() {
    const { onLogout } = useAppContext()
    const [userInfo, setUserInfo] = useState()
    useEffect(() => {
        api.accountInfo().then((res) => {
            if (res.success) setUserInfo(res.data)
        })
    }, [])
    const userInfoCss = classNames(css.userInfo, { [css.active]: userInfo })
    return (
        <div className={css.userBlockWrap}>
            <div className={userInfoCss}>
                {userInfo && (
                    <>
                        <div className={css.userInfoText}>
                            <span style={{ opacity: 0.4 }}>
                                Использовано компаний{' '}
                            </span>
                            <span className={css.compCount}>
                                {userInfo.eventFiltersInfo.usedCompanyCount}
                            </span>
                        </div>
                        <div className={css.userInfoText}>
                            <span style={{ opacity: 0.4 }}>
                                Лимит по компаниям{' '}
                            </span>
                            <span className={css.compLimitCount}>
                                {userInfo.eventFiltersInfo.companyLimit}
                            </span>
                        </div>
                    </>
                )}
            </div>
            <div className={css.userBlock}>
                <div className={css.userBlockInfo}>
                    <div className={css.userName}>Алексей А.</div>
                    <div className={css.exit} onClick={onLogout}>
                        Выйти
                    </div>
                </div>
                <img className={css.avatar} src={avatar} />
            </div>
        </div>
    )
}
