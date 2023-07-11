import css from './MobileMenu.module.scss'
import { Button } from '../../UI/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../AppContext/AppContext'

function MobileMenu(props) {
    const navigate = useNavigate()
    const { onLogout, authInfo } = useAppContext()
    return (
        <div id="myNav" className={css.overlay}>
            <a
                href="javascript:void(0)"
                className={css.closebtn}
                onClick={props.close}
            >
                &times;
            </a>

            <div className={css.overlayContent}>
                <a href="#" onClick={props.close}>
                    Главная
                </a>
                <a href="#" onClick={props.close}>
                    Тарифы
                </a>
                <a href="#" onClick={props.close}>
                    FAQ
                </a>
            </div>
            <div className={css.authBlock}>
                {authInfo ? (
                    <>
                        <div className={css.register} onClick={props.close}>
                            Алексей А.
                        </div>
                        <Button
                            className={css.login}
                            onClick={() => {
                                onLogout()
                                props.close()
                            }}
                        >
                            Выйти
                        </Button>
                    </>
                ) : (
                    <>
                        <div className={css.register} onClick={props.close}>
                            Зарегистрироваться
                        </div>
                        <Button
                            className={css.login}
                            onClick={() => {
                                props.close()
                                navigate('/auth')
                            }}
                        >
                            Войти
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default MobileMenu
