import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './AddBill.module.scss'
import actions from '../store/actions'
import { currency } from '../config'
import BadgeSelector from './BadgeSelector'
import Button from './Button'
import Input from './Input'
import { getGroupUsers } from '../store/selectors'

const mapStateToProps = (state, props) => ({
  users: getGroupUsers(state, props.groupId).filter(
    user => user.id !== state.users.currentUser.id
  ),
  currentUser: state.users.currentUser,
})

const mapDispatchToProps = dispatch => ({
  requestAddBill: params => dispatch(actions.requestAddBill(params)),
})

const SettleUp = ({ users, requestAddBill, currentUser, hide, groupId }) => {
  const [amount, setAmount] = useState('')
  const [selected, setSelected] = useState([])
  const [payer] = useState({ id: currentUser.id, name: 'You' })

  const handleChangeAmount = event => setAmount(event.target.value)

  useEffect(() => {
    const handleKeyDown = ({ keyCode }) => {
      if (keyCode === 27) hide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const save = async () => {
    requestAddBill({
      date: new Date(),
      title: 'Settle up',
      paid: {
        amount: Number(amount),
        userId: payer.id,
      },
      addedBy: currentUser.id,
      groupId: groupId,
      participants: [...selected, currentUser].map(user => user.id),
    })

    hide()
  }

  const select = person => {
    setSelected([...selected, person])
  }

  const deselect = person => {
    setSelected(selected.filter(u => u.id !== person.id))
  }

  return (
    <div className={styles['add-bill']}>
      <div className={styles.box}>
        <div className={styles.cross} onClick={hide}>
          ✕
        </div>
        <div className={styles.title}>Settle up</div>
        <BadgeSelector
          isSettling
          suggested={users}
          selected={selected}
          select={select}
          deselect={deselect}
        />
        <div className={styles.content}>
          <div className={styles.column}>
            <Input
              biggerText
              className={styles.input}
              label="Amount"
              onChange={handleChangeAmount}
              placeholder="0.00"
              right={currency}
              value={amount}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <div>
            <Button title="Cancel" onClick={hide} light />
          </div>
          <div>
            <Button title="Save" onClick={save} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettleUp)
