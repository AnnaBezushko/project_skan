import css from './Button.module.scss'
import classNames from 'classnames'

export function Button(props) {
    const style = classNames(css.button, {
        [props.className]: props.className,
        [css.small]: props.small,
        [css.grey]: props.grey,
        [css.skyBlue]: props.skyBlue,
    })
    return (
        <button
            className={style}
            disabled={props.disabled}
            type={props.type}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
