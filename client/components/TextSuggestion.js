import { optional } from '../utils'

export default ({ text, noHover }) => (
  <div className={`text-suggestion${optional(noHover, 'no-hover')}`}>
    {text}
    <style jsx>{`
      .text-suggestion {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        color: #000;
        font-size: 15px;
      }

      .text-suggestion:hover {
        background-color: #f5f5f5;
      }

      .no-hover {
        color: #888;
        cursor: default;
      }

      .no-hover:hover {
        background-color: #fff;
      }
    `}</style>
  </div>
)
