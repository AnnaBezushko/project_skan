import { ReactComponent as ArrowLeft } from './img/arrow-left.svg'
import { ReactComponent as ArrowRight } from './img/arrow-right.svg'
import css from './css/Arrow.module.scss'
import classNames from 'classnames'

export function Arrow(props) {
    if (props.left) {
        return (
            <div
                className={classNames(css.arrow, css.left, {
                    [props.className]: props.className,
                })}
                onClick={() => props.swiperRef?.current?.slidePrev()}
            >
                <ArrowLeft />
            </div>
        )
    }
    if (props.right) {
        return (
            <div
                className={classNames(css.arrow, css.right, {
                    [props.className]: props.className,
                })}
                onClick={() => props.swiperRef?.current?.slideNext()}
            >
                <ArrowRight />
            </div>
        )
    }
}
