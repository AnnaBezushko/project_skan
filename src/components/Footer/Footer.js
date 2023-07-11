import logo from './img/logo-footer.svg'
import css from './Footer.module.scss'

export function Footer() {
    return (
        <footer className={css.footer}>
            <img src={logo} className={css.logo} />
            <div className={css.info}>
                <div>
                    г. Москва, Цветной б-р, 40
                    <br />
                    +7 495 771 21 11
                    <br />
                    info@skan.ru
                    <br />
                </div>
                <div className={css.copy}>Copyright. 2022</div>
            </div>
        </footer>
    )
}
