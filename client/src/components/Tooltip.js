import React from 'react'
import styles from './Tooltip.module.scss'
import { shortenName } from '../utils'
import { currency } from '../config'

const debts = [
  {
    whom: 'Krzysztof Magiera',
    amount: 100.0,
  },
  {
    whom: 'Michał Osadnik',
    amount: 40.0,
  },
  {
    whom: 'Wojciech Kozyra',
    amount: 1.0,
  },
]

export default () => (
  <div className={styles.tooltip}>
    <div className={styles.content}>
      {debts.map(d => (
        <div key={`${d.whom}_${d.amount}`}>
          {d.amount < 0 ? 'gets back' : 'owes'}{' '}
          <span className={styles.highlight}>
            {d.amount} {currency}
          </span>{' '}
          {d.amount < 0 ? 'from' : 'to'} {shortenName(d.whom)}
        </div>
      ))}
    </div>
    <div className={styles.arrow} />
  </div>
)
