import { components } from 'react-select'

export const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg
                width="20"
                height="11"
                viewBox="0 0 20 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 0.717529H19.4351L9.71753 10.4351L0 0.717529Z"
                    fill="#D9D9D9"
                />
            </svg>
        </components.DropdownIndicator>
    )
}
