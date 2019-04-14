import React, { useState, useEffect } from 'react'
import styles from './Bills.module.scss'
import Button from './Button'
import Bill from './Bill'
import AddBill from './AddBill'
import { connect } from 'react-redux'
import actions from '../store/actions'
import { getGroupBills } from '../store/selectors'
import Spinner from './Spinner'

// const bills = [
//   {
//     date: '2018-11-04 01:45',
//     id: 1,
//     paid: {
//       amount: 10.0,
//       id: 100,
//       name: 'Tomek Czajęcki',
//     },
//     title: 'Ryba',
//   },
//   {
//     date: '2018-11-04 00:06',
//     id: 2,
//     paid: {
//       amount: 120.0,
//       id: 50,
//       name: 'Michał Osadnik',
//     },
//     title: 'Keps',
//   },
//   {
//     date: '2018-11-01 00:06',
//     id: 3,
//     paid: {
//       amount: 101.0,
//       id: 51,
//       name: 'Tomasz Sapeta',
//     },
//     title: 'An-nam',
//   },
//   {
//     date: '2018-10-21 00:06',
//     id: 4,
//     paid: {
//       amount: 10,
//       id: 51,
//       name: 'Tomasz Czajęcki',
//     },
//     title: 'Jadłodajnia',
//   },
//   {
//     date: '2014-10-15 00:06',
//     id: 5,
//     paid: {
//       amount: 10.0,
//       id: 51,
//       name: 'Kamil Świerad',
//     },
//     title: 'ZDG',
//   },
// ]

const mapStateToProps = (state, props) => ({
  bills: getGroupBills(state, props.groupId),
})

const Bills = ({ bills }) => {
  const [showAdd, setShowAdd] = useState(false)
  const onClick = () => setShowAdd(true)
  const hide = () => setShowAdd(false)

  return (
    <div className={styles.bills}>
      <div className={styles.header}>
        {showAdd && <AddBill hide={hide} />}
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
