import React from 'react'
import styles from './Tooltip.module.scss'
import { shortenName } from '../utils'
import { currency } from '../config'
import { connect } from 'react-redux'

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

const getDebts = (user, users, groupId) => {
  const debts = {}
  user.bills
    .filter(bill => bill.groupId === groupId)
    .forEach(bill => {
      if (bill.paid.userId === user.id) return

      const amount = bill.paid.amount / bill.participants.length
      if (debts[bill.paid.userId]) {
        debts[bill.paid.userId].amount += amount
      } else {
        debts[bill.paid.userId] = {
          whom: users[bill.paid.userId].name,
          amount: amount,
        }
      }
    })

  return Object.values(debts)
}

const mapStateToProps = state => ({ users: state.users.all })

const Tooltip = ({ user, users, groupId }) => {
  const debts = getDebts(user, users, groupId)
  if (debts.length === 0) return null

  return (
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
}

export default connect(mapStateToProps)(Tooltip)
