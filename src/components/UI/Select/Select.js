// https://www.cluemediator.com/how-to-add-a-react-select-dropdown-with-react-hook-form-in-react

import { DropdownIndicator } from '../../SearchPage/reactSelectParts'
import { useController } from 'react-hook-form'
import { default as RSelect } from 'react-select'
import css from '../Input/Input.module.scss'

function MySelect({ errors, className, name, label, ...props }) {
    const styles = {
        indicatorSeparator: (base) => ({
            ...base,
            display: 'none',
        }),
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                textAlign: 'center',
            }
        },
        control: (styles) => {
            return {
                ...styles,
                borderColor: errors[name] ? '#FF5959' : '#C7C7C7',
                borderRadius: '5px',
                background: '#FFFFFF',
                boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.05)',
                height: '43px',
            }
        },
    }
    const {
        field: { value, onChange, ...restLangField },
    } = useController({ name, control: props.control })
    return (
        <>
            {label && <label className={css.labelAuth}>{label}</label>}
            <RSelect
                styles={styles}
                menuPortalTarget={document.querySelector('body')}
                placeholder={props.placeholder}
                options={props.options}
                value={
                    value ? props.options.find((x) => x.value === value) : value
                }
                onChange={(option) => onChange(option ? option.value : option)}
                components={{ DropdownIndicator }}
                defaultValue={props.defaultValue}
            />
            {errors[name] && (
                <span className={css.errorText}>
                    {errors[name].type === 'required'
                        ? 'Обязательное поле'
                        : errors[name].message}
                </span>
            )}
        </>
    )
}

export default MySelect
