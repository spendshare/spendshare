import { useState } from 'react'
import { fontFamily } from '../config'
import { optional } from '../utils'

export default ({ biggerText, label, right, ...props }) => {
  const [value, setValue] = useState('')
  const handleChange = event => setValue(event.target.value)
  return (
    <div className={`input-wrapper${optional(biggerText, 'bigger')}`}>
      {right && <div className="right">{right}</div>}
      {label && <span className="label">{label}</span>}
      <input
        value={value}
        onChange={handleChange}
        {...props}
      />
      <style jsx>{`
        .input-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .input {
          font-family: ${fontFamily}, sans-serif;
          font-size: 16px;
          height: 40px;
          width: 170px;
          border: none;
          border-bottom: 2px solid #eee;
          margin: 0 0 10px;
          padding: 0 10px;
        }

        input:focus {
          outline: none;
          border-bottom-color: #000;
        }

        .bigger .input {
          font-size: 24px;
        }

        .label {
          color: #888;
          font-size: 12px;
        }

        .right {
          position: absolute;
          right: 15px;
          font-size: 14px;
          color: #888;
          bottom: 22px;
          display: flex;
          align-items: center;
        }

        .right input {
          padding-right: 40px;
        }

        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: #888;
          opacity: 1; /* Firefox */
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #888;
        }

        ::-ms-input-placeholder { /* Microsoft Edge */
            color: #888;
        }
      `}</style>
    </div>
  )
}
