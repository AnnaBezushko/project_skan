import { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import './css/MainPageSlider.css'
import css from './css/MainPageSlider.module.scss'
import { SlideItem } from '../../UI/SlideItem/SlideItem'
import { Arrow } from './Arrow'
import { useRef } from 'react'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import icon1 from './img/icon1.svg'
import icon2 from './img/icon2.svg'
import icon3 from './img/icon3.svg'

export function MainPageSlider() {
    const swiperRef = useRef()
    return (
        <div className={css.wrapperArrows}>
            <Arrow left swiperRef={swiperRef} />
            <div className={css.wrapperSlider}>
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    spaceBetween={30}
                    modules={[Autoplay, Pagination, Navigation]}
                    // autoplay={{
                    //     delay: 2500,
                    //     disableOnInteraction: false,
                    // }}
                    onSlideChange={() => console.log('slide change')}
                    // centeredSlides={true}
                    // centeredSlidesBounds={true}
                    loop={true}
                    // slidesPerView={3}
                    breakpoints={{
                        1159: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        975: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        370: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                    }}
                >
                    <SwiperSlide>
                        <SlideItem
                            text={
                                'Высокая и оперативная скорость обработки заявки'
                            }
                            icon={icon1}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideItem
                            text={
                                'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
                            }
                            icon={icon2}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideItem
                            text={
                                'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
                            }
                            icon={icon3}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideItem
                            text={
                                'Высокая и оперативная скорость обработки заявки'
                            }
                            icon={icon1}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideItem
                            text={
                                'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
                            }
                            icon={icon2}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideItem
                            text={
                                'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
                            }
                            icon={icon3}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
            <Arrow swiperRef={swiperRef} right />
        </div>
    )
}
