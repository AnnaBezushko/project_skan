import css from './MainPage.module.scss'
import { Button } from '../UI/Button/Button'
import { Page } from '../UI/Page/Page'
import { MainPageSlider } from './Slider/MainPageSlider'
import { Tariffs } from './Tariffs/Tariffs'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../AppContext/AppContext'

export function MainPage() {
 const navigate = useNavigate()
 const { authInfo } = useAppContext()
    return (
        <Page className={css.mainPage}>
            <div className={css.topBlock}>
                <h1 className={css.title}>
                    сервис по поиску публикаций
                    <br /> о компании <br />
                    по его ИНН
                </h1>
                <div className={css.subtitle}>
                    Комплексный анализ публикаций, получение данных в формате
                    PDF на электронную почту.
                </div>
                {authInfo && <Button onClick={() => navigate('/search')}>Запросить данные</Button>}
            </div>
            <div className={css.block}>
                <h2 className={css.titleSmall}>Почему именно мы</h2>
                <MainPageSlider />
            </div>
            <SittingMan />
            <div className={css.block}>
                <h2 className={css.titleSmall}>наши тарифы</h2>
                <Tariffs />
            </div>
        </Page>
    )
}

function SittingMan() {
    return <div className={css.sittingMan} />
}
