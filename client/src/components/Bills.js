import React, { useState, useEffect } from 'react'
import styles from './Bills.module.scss'
import Button from './Button'
import Bill from './Bill'
import AddBill from './AddBill'
import { connect } from 'react-redux'
import { getGroupBills } from '../store/selectors'

const mapStateToProps = (state, props) => ({
  bills: getGroupBills(state, props.groupId),
})

const Bills = ({ bills, groupId }) => {
  const [showAdd, setShowAdd] = useState(false)
  const onClick = () => setShowAdd(true)
  const hide = () => setShowAdd(false)

  return (
    <div className={styles.bills}>
      <div className={styles.header}>
        {showAdd && <AddBill groupId={groupId} hide={hide} />}
        <Button
          title="Add a bill"
          onClick={onClick}
          style={{ marginBottom: 20 }}
        />
      </div>
      {bills.map(bill => (
        <Bill bill={bill} key={bill.id} />
      ))}
    </div>
  )
}

export default connect(mapStateToProps)(Bills)
