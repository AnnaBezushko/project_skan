import css from './ResultsPage.module.scss'
import classNames from 'classnames'
import { Button } from '../UI/Button/Button'
import { Arrow } from '../MainPage/Slider/Arrow'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useRef, useState } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import api from '../../api'
import { useAppContext } from '../AppContext/AppContext'
import { countForm } from '../../utils'
import { useNavigate } from 'react-router-dom'
import * as DOMPurify from 'dompurify'
import parse from 'html-react-parser'

function ResultsPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const swiperRef = useRef()
    const context = useAppContext()
    const [offset, setOffset] = useState(0)
    const [documents, setDocuments] = useState([])
    const loadDocuments = async () => {
        if (!context.searchResults?.objectsearch?.items) {
            return
        }
        setLoading(true)
        const newDocuments = await api.documents({
            ids: context.searchResults.objectsearch.items
                .slice(offset, offset + 10)
                .map(({ encodedId }) => encodedId),
        })
        if (newDocuments) {
            setDocuments([...documents, ...newDocuments])
            setOffset(offset + 9)
        }
        setLoading(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        loadDocuments()
        return () => {
            setOffset(0)
            setDocuments([])
        }
    }, [])

    if (!context?.searchResults?.objectsearch?.items) {
        navigate('/search')
        return null
    }
    return (
        <div className={css.page}>
            <h1 className={css.title}>
                Ищем. Скоро
                <br /> будут результаты
            </h1>
            <div className={css.subtitle}>
                Поиск может занять некоторое время,
                <br /> просим сохранять терпение.
            </div>
            <div className={css.carouselTitle}>Общая сводка</div>
            <div className={css.carouselSubTitle}>Найдено 4 221 вариантов</div>
            <div className={css.carouselWithArrowsWrap}>
                <Arrow left swiperRef={swiperRef} className={css.arrow} />
                <div className={css.carouselWrap}>
                    <Swiper
                        wrapperClass={css.swiper}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                        spaceBetween={30}
                        modules={[Autoplay, Pagination, Navigation]}
                        slidesPerView={'auto'}
                    >
                        <SwiperSlide>
                            <Item
                                date="Период"
                                all="Всего"
                                risks="Риски"
                                first
                            />
                        </SwiperSlide>
                        {context.searchResults.histograms.data[0].data
                            .map((item, idx) => ({
                                date: item.date,
                                total: item.value,
                                risk: context.searchResults.histograms.data[1]
                                    .data[idx].value,
                            }))
                            .map(({ date, total, risk }) => (
                                <SwiperSlide>
                                    <Item
                                        date={getFormattedDate(new Date(date))}
                                        all={total}
                                        risks={risk}
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <Arrow swiperRef={swiperRef} right className={css.arrow} />
            </div>
            <div className={css.publicationSectionTitle}>Список документов</div>
            <div className={css.publicationsWrap}>
                <div className={css.publications}>
                    {documents.map(({ ok }) => (
                        <Publication
                            date={ok.issueDate}
                            link={ok.url}
                            linkTitle={ok.source.name}
                            title={ok.title.text}
                            image={
                                'https://i0.wp.com/techprimelab.com/wp-content/uploads/2020/06/SCSS-or-CSS.jpg'
                            }
                            content={ok.content.markup}
                            attributes={ok.attributes}
                        />
                    ))}
                </div>
                <div className={css.btnMoreWrap} onClick={loadDocuments}>
                    {offset <
                    context.searchResults.objectsearch.items.length ? (
                        <Button disabled={loading}>Показать больше</Button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

function Item(props) {
    const itemCss = classNames(css.carouselItem, { [css.first]: props.first })
    return (
        <div className={itemCss}>
            <div className={css.row}>{props.date}</div>
            <div className={css.row}>{props.all}</div>
            <div className={css.row}>{props.risks}</div>
            <div className={css.border} />
        </div>
    )
}

function getFormattedDate(date) {
    return `${date.getDate()}.${
        date.getMonth() <= 9 ? `0${date.getMonth()}` : date.getMonth()
    }.${date.getFullYear()}`
}

function Publication(props) {
    const date = new Date(props.date)
    const formattedDate = getFormattedDate(date)

    const clean = DOMPurify.sanitize(props.content)
    const parsed = DOMPurify.sanitize(parse(clean))
    const contentImages = parsed.match(/<img[^>]*src="([^"]+)"[^>]*>/)
    const result = parsed.replace(/<\/?[^>]+(>|$)/g, '')
    const imgLink =
        contentImages && contentImages[1].startsWith('http') && contentImages[1]

    return (
        <div className={css.publication}>
            <div>
                <span className={css.publicationDate}>{formattedDate}</span>
                {props.link ? (
                    <a className={css.publicationLink} href={props.link}>
                        {props.linkTitle}
                    </a>
                ) : (
                    <div className={css.publicationLink}>{props.linkTitle}</div>
                )}
            </div>
            <div className={css.publicationTitle}>{props.title}</div>
            <div className={css.publicationTags}>
                {props.attributes.isTechNews && (
                    <div className={css.publicationTag}>
                        Технические новости
                    </div>
                )}
                {props.attributes.isAnnouncement && (
                    <div className={css.publicationTag}>Анонс</div>
                )}
                {props.attributes.isDigest && (
                    <div className={css.publicationTag}>Дайджест</div>
                )}
            </div>

            <img
                src={imgLink || props.image}
                alt={props.link}
                className={css.publicationImg}
            />

            <div
                className={css.publicationContent}
                dangerouslySetInnerHTML={{ __html: result }}
            ></div>
            {!!props.link && (
                <Button
                    className={css.button}
                    onClick={() => window.open(props.link)}
                >
                    Читать в источнике
                </Button>
            )}
            <div className={css.wordCount}>
                {props.attributes.wordCount}{' '}
                {countForm(props.attributes.wordCount, [
                    'слово',
                    'слова',
                    'слов',
                ])}
            </div>
        </div>
    )
}

export default ResultsPage
