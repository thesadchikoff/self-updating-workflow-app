import { forwardRef, useState } from 'react'
import { FieldError } from 'react-hook-form'
import styles from './Input.module.scss'

interface IField {
  icon?: JSX.Element
  error?: FieldError
  placeholder?: string
  type?: string
}
const Input = forwardRef<HTMLInputElement, IField>(
  ({ icon, error, placeholder, type = 'text', ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    console.log(rest, 'rests')
    return (
      <div className="w-full flex flex-col gap-1 ">
        <div
          className={`${styles['field-item']} border !bg-background ${isFocused ? 'border-accent' : 'border-border'}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {icon && <div className={`${isFocused && styles['svg-focus']}`}>{icon}</div>}
          <input
            ref={ref}
            {...rest}
            type={type}
            placeholder={placeholder}
            aria-invalid={error ? 'true' : 'false'}
            className={`${styles.input} ${isFocused ? 'placeholder:text-accent' : 'placeholder:text-border'}`}
          />
        </div>
        <div className="w-full flex justify-start h-1">
          {error && <p role="alert">{error.message}</p>}
        </div>
      </div>
    )
  }
)

export default Input
