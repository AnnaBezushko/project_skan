import css from './Input.module.scss'
import classNames from 'classnames'

const Input = ({
    name,
    label,
    register,
    required,
    errors,
    placeholder,
    className,
    type,
    registerConfig,
}) => {
    const cssInput = classNames(css.input, {
        [css.errorInput]: errors[name],
        [className]: className,
    })
    return (
        <>
            {label && <label className={css.labelAuth}>{label}</label>}
            <input
                className={cssInput}
                {...register(name, { required, ...registerConfig })}
                placeholder={placeholder}
                type={type || 'text'}
            />
            {errors[name] && (
                <span className={css.errorText}>
                    {errors[name].type === 'required'
                        ? 'Обязательное поле'
                        : errors[name].message}
                </span>
            )}
        </>
    )
}

export default Input
