import css from './SearchPage.module.scss'
import Input from '../UI/Input/Input'
import { useForm } from 'react-hook-form'
import Select from '../UI/Select/Select'
import classNames from 'classnames'
import Checkbox from '../UI/Checkbox/Checkbox'
import AuthorizationHOC from '../AuthorizationHOC/AuthorizationHOC'
import api from '../../api'
import convertDataForRequest from './convertData'
import { Button } from '../UI/Button/Button'
import { useAppContext } from '../AppContext/AppContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const tonality = [
    { value: 'any', label: 'Любая' },
    { value: 'negative', label: 'Негативная' },
    { value: 'neutral', label: 'Нейтральная' },
    { value: 'positive', label: 'Позитивная' },
]

function SearchPage() {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            maxFullness: true,
            inn: '7710137066',
            limit: 500,
            startDate: '2022-02-01',
            endDate: '2023-06-27',
        },
    })

    const context = useAppContext()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data) => {
        setLoading(true)
        const histograms = await api.histograms(convertDataForRequest(data))
        const objectsearch = await api.objectsearch(convertDataForRequest(data))
        if (objectsearch.items && objectsearch.items.length > 0) {
            context.setSearchResults({ histograms, objectsearch })
            navigate('/results')
        } else {
            alert('Ничего не найдено! Попробуйте изменить параметры поиска')
        }
        setLoading(false)
    }
    return (
        <AuthorizationHOC>
            <div className={css.page}>
                <h1 className={css.title}>
                    Найдите необходимые данные в пару кликов.
                </h1>
                <div className={css.subtitle}>
                    Задайте параметры поиска.
                    <br /> Чем больше заполните, тем точнее поиск
                </div>
                <div className={css.document} />
                <div className={css.folders} />
                <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.block}>
                        <div className={css.shortInputs}>
                            <Input
                                name="inn"
                                label={
                                    <SearchLabel error={errors['inn']} required>
                                        ИНН компании
                                    </SearchLabel>
                                }
                                register={register}
                                required
                                errors={errors}
                                placeholder="10 цифр"
                                className={css.input}
                                registerConfig={{
                                    maxLength: {
                                        value: 10,
                                        message: '10 цифр',
                                    },
                                    minLength: {
                                        value: 10,
                                        message: '10 цифр',
                                    },
                                }}
                                type="number"
                            />
                            <Select
                                label={
                                    <SearchLabel error={errors['tonality']}>
                                        Тональность
                                    </SearchLabel>
                                }
                                control={control}
                                options={tonality}
                                name="tonality"
                                defaultValue={tonality[0]}
                                errors={errors}
                            />
                            <Input
                                name="limit"
                                label={
                                    <SearchLabel
                                        error={errors['limit']}
                                        required
                                    >
                                        Количество&nbsp;документов&nbsp;в&nbsp;выдаче
                                    </SearchLabel>
                                }
                                register={register}
                                required
                                errors={errors}
                                placeholder="От 1 до 1000"
                                className={css.input}
                                registerConfig={{
                                    max: {
                                        value: 1000,
                                        message: 'Не более 1000',
                                    },
                                    min: {
                                        value: 1,
                                        message: 'От 1 до 1000',
                                    },
                                }}
                                type="number"
                            />
                        </div>
                        <SearchLabel error={errors['startDate']} required>
                            Диапазон поиска
                        </SearchLabel>
                        <div className={css.diapazon}>
                            <div>
                                <Input
                                    type="date"
                                    name="startDate"
                                    register={register}
                                    errors={errors}
                                    className={css.input}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    type="date"
                                    name="endDate"
                                    register={register}
                                    errors={errors}
                                    className={css.input}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classNames(css.block, css.filtersBlock)}>
                        <Checkbox
                            {...register('maxFullness')}
                            setValue={setValue}
                            defaultChecked={true}
                            label="Признак максимальной полноты"
                        />
                        <Checkbox
                            {...register('inBusinessNews')}
                            setValue={setValue}
                            value={true}
                            label={'Упоминания в бизнес-контексте'}
                        />
                        <Checkbox
                            {...register('onlyMainRole')}
                            setValue={setValue}
                            value={true}
                            label={'Главная роль в публикации'}
                        />
                        <Checkbox
                            {...register('onlyWithRiskFactors')}
                            setValue={setValue}
                            value={true}
                            label={'Публикации только с риск-факторами'}
                        />
                        <Checkbox
                            {...register('excludeTechNews')}
                            setValue={setValue}
                            value={true}
                            label={'Включать технические новости рынков'}
                        />
                        <Checkbox
                            {...register('excludeAnnouncements')}
                            setValue={setValue}
                            value={true}
                            label={'Включать анонсы и календари'}
                        />
                        <Checkbox
                            {...register('excludeDigests')}
                            setValue={setValue}
                            value={true}
                            label={'Включать сводки новостей'}
                        />
                        <Button type={'submit'} disabled={loading}>
                            Поиск
                        </Button>
                    </div>
                </form>
            </div>
        </AuthorizationHOC>
    )
}

function SearchLabel(props) {
    const iconCss = classNames(css.labelIcon, { [css.errorIcon]: props.error })
    return (
        <span className={css.label}>
            {props.children}
            {props.required && <span className={iconCss}>*</span>}
        </span>
    )
}

export default SearchPage
