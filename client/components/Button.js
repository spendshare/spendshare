import { noop, optional } from '../utils'
import { primaryColor, dark } from '../config'

export default ({
  border,
  title,
  loading,
  light,
  onClick,
  ...props,
}) => {
  return (
    <div
      className={`button${optional(loading, 'loading')}${optional(light, 'light')}${optional(border, 'border')}`}
      onClick={loading ? noop : onClick}
      {...props}
    >
      {title}
      <style jsx>{`
        .button {
          cursor: pointer;
          color: ${dark ? '#000' : '#fff'};
          background-color: ${primaryColor};
          border-radius: 5px;
          padding: 0 16px;
          line-height: 32px;
          height: 32px;
          min-width: 64px;
          text-align: center;
          box-sizing: border-box;
        }

        .button:hover {
          opacity: 0.7;
        }

        .light {
          background-color: #eee;
          color: #000;
        }

        .light:hover {
          opacity: 1;
          background-color: #ddd;
        }

        .border {
          line-height: 28px;
          color: ${primaryColor};
          background-color: #fff;
          border: 2px solid ${primaryColor};
        }

        .loading {
          color: rgba(${dark ? '0, 0, 0' : '255, 255, 255'}, 0.3);
        }
      `}</style>
    </div>
  )
}
