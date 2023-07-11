import css from './Tariff.module.scss'
import classNames from 'classnames'
import { Button } from '../../UI/Button/Button'

export function Tariff(props) {
    const headerCss = classNames(css.header, props.colorCss)
    return (
        <div className={css.tariff}>
            <div className={headerCss}>
                <div className={css.title}>{props.title}</div>
                <div className={css.sublitle}>{props.subtitle}</div>
                <img className={css.icon} src={props.icon} />
            </div>
            <div className={css.content}>
                <div className={css.wrap}>
                    <div className={css.priceBlock}>
                        <div className={css.price}>{props.price} ₽</div>
                        <div className={css.sale}>{props.sale} ₽</div>
                    </div>
                    {props.extra && (
                        <div className={css.text}>{props.extra}</div>
                    )}
                </div>
                <div className={css.list}>
                    <div className={css.listTitle}>В тариф входит:</div>
                    {props.options.map((text) => (
                        <div className={css.option}>
                            <div className={css.optionIcon}></div>
                            <div className={css.optionText}>{text}</div>
                        </div>
                    ))}
                </div>
                <Button grey={props.grey} small>
                    {props.btnText}
                </Button>
            </div>
        </div>
    )
}
