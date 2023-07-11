import { useForm } from 'react-hook-form'
import api from '../../api'
import Input from '../UI/Input/Input'
import css from './AuthPage.module.scss'
import { Button } from '../UI/Button/Button'
import classNames from 'classnames'
import ya from './img/ya.svg'
import fb from './img/fb.svg'
import google from './img/goog.svg'
import lock from './img/lock.svg'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../AppContext/AppContext'
import { useState } from 'react'

function AuthForm() {
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const ctx = useAppContext()
    const onSubmit = async (data) => {
        setLoading(true)
        const authInfo = await api.login(data.login, data.password)
        setLoading(false)
        if (authInfo == null) {
            setError('formError', {
                type: 'custom',
                message: 'Неизвестная ошибка',
            })
        } else if (authInfo.success) {
            ctx.onLogin(authInfo.data)
            navigate('/search')
        } else {
            switch (authInfo.data?.errorCode) {
                case 'Auth_InvalidUserOrPassword':
                    setError('login', {
                        type: 'custom',
                        message: 'Неправильное имя или пароль',
                    })
                    setError('password', {
                        type: 'custom',
                        message: 'Неправильное имя или пароль',
                    })
                    return
                default:
                    setError('formError', {
                        type: 'custom',
                        message: 'Неизвестная ошибка',
                    })
                    return
            }
        }
    }
    const login = watch('login')
    const password = watch('password')
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <img src={lock} className={css.lock} />
            <div className={css.tabs}>
                <div className={classNames(css.tab, css.active)}>Войти</div>
                <div className={css.tab}>Зарегистрироваться</div>
            </div>
            <Input
                label="Логин или номер телефона:"
                name="login"
                register={register}
                required
                errors={errors}
            />
            <Input
                label="Пароль: sf_student7 P6VcKNf"
                name="password"
                register={register}
                required
                errors={errors}
            />
            `
            <Button
                type="submit"
                className={css.button}
                disabled={!login || !password || loading}
            >
                Войти
            </Button>
            <div className={css.resetPass}>Восстановить пароль</div>
            <div className={css.socialTitle}>Войти через:</div>
            <div className={css.social}>
                <img src={ya} />
                <img src={google} />
                <img src={fb} />
            </div>
        </form>
    )
}

function AuthPage() {
    return (
        <div className={css.page}>
            <h1 className={css.title}>
                Для оформления подписки на тариф, необходимо авторизоваться.
            </h1>
            <AuthForm />
        </div>
    )
}

export default AuthPage
