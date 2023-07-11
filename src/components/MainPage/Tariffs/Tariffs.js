import { Tariff } from './Tariff'
import css from './Tariff.module.scss'
import icon3 from './img/tariff3.svg'
import icon2 from './img/tariff2.svg'
import icon1 from './img/tariff1.svg'

export function Tariffs() {
    return (
        <div className={css.tariffs}>
            <Tariff
                title={'Beginner'}
                subtitle={'Для небольшого исследования'}
                colorCss={css.yellow}
                icon={icon1}
                price={799}
                sale={1200}
                options={[
                    'Безлимитная история запросов',
                    'Безопасная сделка',
                    'Поддержка 24/7',
                ]}
                extra="или 150 ₽/мес. при рассрочке на 24 мес."
                btnText="Перейти в личный кабинет"
                grey
            />
            <Tariff
                title={'Pro'}
                subtitle={'Для HR и фрилансеров'}
                colorCss={css.green}
                icon={icon2}
                price={899}
                sale={1300}
                options={[
                    'Все пункты тарифа Beginner',
                    'Экспорт истории',
                    'Экспорт истории',
                ]}
                extra="или 279 ₽/мес. при рассрочке на 24 мес."
                btnText="Подробнее"
            />
            <Tariff
                title={'Business'}
                subtitle={'Для корпоративных клиентов'}
                colorCss={css.black}
                icon={icon3}
                price={999}
                sale={1400}
                options={[
                    'Все пункты тарифа Pro',
                    'Безлимитное количество запросов',
                    'Приоритетная поддержка',
                ]}
                btnText="Подробнее"
            />
        </div>
    )
}
