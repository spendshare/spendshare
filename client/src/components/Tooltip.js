import React from 'react'
import styles from './Tooltip.module.scss'
import { shortenName } from '../utils'
import { currency } from '../config'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ users: state.users.all })

const Tooltip = ({ user, users, groupId, debts }) => {
  if (!debts || debts.length === 0) return null

  return (
    <div className={styles.tooltip}>
      <div className={styles.content}>
        {debts.map(d => (
          <div key={`${users[d.whom].name}_${d.amount}`}>
            {d.amount < 0 ? 'gets back' : 'owes'}{' '}
            <span className={styles.highlight}>
              {Math.abs(d.amount).toFixed(2)} {currency}
            </span>{' '}
            {d.amount < 0 ? 'from' : 'to'} {shortenName(users[d.whom].name)}
          </div>
        ))}
      </div>
      <div className={styles.arrow} />
    </div>
  )
}

export default connect(mapStateToProps)(Tooltip)
