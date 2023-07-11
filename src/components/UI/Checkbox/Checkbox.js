import React from 'react'
import css from './Checkbox.module.scss'
import classNames from 'classnames'
// primer https://codesandbox.io/s/react-hook-form-custom-checkbox-yncp5?file=/src/App.js:106-826

const Checkbox = React.forwardRef(
    (
        { label, name, value, onChange, defaultChecked, setValue, ...rest },
        forwardedRef
    ) => {
        const [checked, setChecked] = React.useState(defaultChecked || false)

        React.useEffect(() => {
            setValue(name, checked)
        }, [checked, setValue, name])
        const labelCss = classNames(css.label, { [css.checked]: checked })
        const arrowCss = classNames(css.arrow, { [css.arrowChecked]: checked })
        return (
            <div onClick={() => setChecked(!checked)} className={labelCss}>
                <input
                    style={{ display: 'none' }}
                    ref={forwardedRef}
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                />
                <div className={arrowCss} />
                {label}
            </div>
        )
    }
)

export default Checkbox
