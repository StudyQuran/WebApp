import React from 'react'
import { useFormContext } from 'react-hook-form'
import NumberFormat from 'react-number-format'

type Props = {
  label?: string
  name: string
  options?: Array<String>
  input_type: string
  max_range?: number
  id: string
  value?: string
  disabled?: boolean
  checked?: boolean
  size?: number
  width?: number
  rows?: number
  label_size?: number
  style?: object
  defaultValue?: string
  placeholder?: string
  autoComplete?: boolean
}

const MyInput: React.FC<Props> = (props: Props) => {
  const [passwordToggle, setpasswordToggle] = React.useState(false)
  const { register } = useFormContext()
  // if (!props.options) {
  //   props.options = []
  // }
  return (
    <>
      {props.input_type === 'input' ? (
        <>
          <label>{props.label}</label>
          <input placeholder={props.placeholder} name={props.name} ref={register} />
        </>
      ) : props.input_type === 'password' ? (
        <>
          <label onClick={() => setpasswordToggle((prev) => (prev = !prev))}>{props.label}</label>
          <input
            id={props.id}
            data-tip
            data-for='password'
            placeholder={props.placeholder}
            type={passwordToggle ? 'text' : 'password'}
            name={props.name}
            ref={register}
            autoComplete='off'
          />
        </>
      ) : props.input_type === 'checkbox' ? (
        <>
          <label>label={props.label}</label>
          <input type='checkbox' name={props.name} ref={register} />
        </>
      ) : props.input_type === 'radio' ? (
        <>
          <label>{props.label}</label>
          <input type='radio' name={props.name} ref={register} />
        </>
      ) : props.input_type === 'number' ? (
        <NumberFormat name={props.name} ref={register} displayType={'input'} thousandSeparator={true} />
      ) : null}
    </>
  )
}

export default MyInput
