import css from './SlideItem.module.scss'

export function SlideItem(props) {
    return (
        <div className={css.slideItem}>
            <img src={props.icon} />
            <span>{props.text}</span>
        </div>
    )
}
