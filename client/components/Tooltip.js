
import { shortenWord } from '../utils'
import { currency } from '../config'

const debts = [{
  whom: 'Krzysztof Magiera',
  amount: 100.0,
}, {
  whom: 'Michał Osadnik',
  amount: 40.0,
}, {
  whom: 'Wojciech Kozyra',
  amount: 1.0,
}]

const shortenName = name => {
  const [firstName, ...rest] = name.split(' ')
  return `${firstName} ${shortenWord(rest.slice(-1)[0])}`
}

export default () => (
  <div className="tooltip">
    <div className="content">
      {debts.map(d => (
        <div key={`${d.whom}_${d.amount}`}>
          {d.amount < 0 ? 'gets back' : 'owes'}{' '}
          <span className="highlight">{d.amount} {currency}</span>{' '}
          {d.amount < 0 ? 'from' : 'to'}{' '}
          {shortenName(d.whom)}
        </div>
      ))}
    </div>
    <div className="arrow"></div>
    <style jsx>{`
      .tooltip {
        position: absolute;
        display: flex;
      }

      .content {
        background-color: #000;
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        padding: 7px 10px;
        border-radius: 5px;
        line-height: 18px;
        width: 200px;
      }

      .highlight {
        color: #fff;
      }

      .arrow {
        width: 0;
        height: 0;
        margin-top: 10px;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid black;
      }
    `}</style>
  </div>
)
