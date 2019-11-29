import React, { useState } from 'react'
import styles from './Bills.module.scss'
import Button from './Button'
import Bill from './Bill'
import AddBill from './AddBill'
import SettleUp from './SettleUp'
import { connect } from 'react-redux'
import { getGroupBills } from '../store/selectors'

const mapStateToProps = (state, props) => ({
  bills: getGroupBills(state, props.groupId),
})

const Bills = ({ bills, groupId }) => {
  const [showAdd, setShowAdd] = useState(false)
  const [showSettle, setShowSettle] = useState(false)
  const onClickAdd = () => setShowAdd(true)
  const onClickSettle = () => setShowSettle(true)
  const hideAdd = () => setShowAdd(false)
  const hideSettle = () => setShowSettle(false)

  return (
    <div className={styles.bills}>
      <div className={styles.header}>
        {showAdd && <AddBill groupId={groupId} hide={hideAdd} />}
        {showSettle && <SettleUp groupId={groupId} hide={hideSettle} />}
        <Button
          title="Add a bill"
          onClick={onClickAdd}
          style={{ marginBottom: 20 }}
        />
        <Button
          title="Settle up"
          onClick={onClickSettle}
          style={{ marginLeft: 20, marginBottom: 20 }}
        />
      </div>
      {bills.map(bill => (
        <Bill bill={bill} key={bill.id} />
      ))}
    </div>
  )
}

export default connect(mapStateToProps)(Bills)
