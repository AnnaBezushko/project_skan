import css from './Page.module.scss'
import classNames from 'classnames'

export function Page(props) {
    return (
        <div
            className={classNames(css.page, {
                [props.className]: props.className,
            })}
        >
            {props.children}
        </div>
    )
}
