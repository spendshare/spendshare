import React, { useState, useEffect, createRef } from 'react'
import { connect } from 'react-redux'
import './AddBill.scss'
import { sleep, shortenName } from '../utils'
import actions from '../store/actions'
import { currency } from '../config'
import BadgeSelector from './BadgeSelector'
import Button from './Button'
import DropdownSelector from './DropdownSelector'
import Input from './Input'
import Suggestion from './Suggestion'
import TextSuggestion from './TextSuggestion'

const url = 'http://localhost:3000/api/save/asd'

const groups = [
  {
    id: 'R3JvdXA6MQ==',
    name: 'Chińczyk',
  },
  {
    id: 'R3JvdXA6Mg==',
    name: 'Meksykanin',
  },
]

const AddBill = ({ users, dispatch, hide }) => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [selected, setSelected] = useState([])
  const [payer, setPayer] = useState({ name: 'You' })
  const [group, setGroup] = useState(groups[0] || { name: 'No group' })

  const handleChangeTitle = event => setTitle(event.target.value)
  const handleChangeAmount = event => setAmount(event.target.value)

  useEffect(() => {
    const handleKeyDown = ({ keyCode }) => {
      if (keyCode === 27) hide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const save = async () => {
    dispatch(
      actions.requestAddBill({
        group,
        payer,
        selected,
      })
    )
    hide()
  }

  const splittingWay = 'equally'

  const select = person => {
    setSelected([...selected, person])
  }

  const deselect = person => {
    setSelected(selected.filter(u => u.id !== person.id))
  }

  const renderPerson = option => <Suggestion user={option} />
  const renderGroup = option => <TextSuggestion text={option.name} />

  const selectPayer = option => setPayer(option)
  const selectGroup = option => setGroup(option)

  return (
    <div className="add-bill">
      <div className="box">
        <div className="cross" onClick={hide}>
          ✕
        </div>
        <div className="title">Add a bill</div>
        <BadgeSelector
          suggested={users.list}
          selected={selected}
          select={select}
          deselect={deselect}
        />
        <div className="content">
          <div className="column">
            <Input
              autoFocus
              className="input"
              label="Title"
              onChange={handleChangeTitle}
              placeholder="Enter a description..."
              value={title}
            />
            <Input
              biggerText
              className="input"
              label="Amount"
              onChange={handleChangeAmount}
              placeholder="0.00"
              right={currency}
              value={amount}
            />
            <div className="descriptive">
              Paid by{' '}
              <DropdownSelector
                title={payer.name !== 'You' ? shortenName(payer.name) : 'You'}
                options={[{ name: 'You' }, ...selected]}
                renderOption={renderPerson}
                select={selectPayer}
                searchKeys={['name']}
              />{' '}
              and split equally
            </div>
            <div className="descriptive">
              in group{' '}
              <DropdownSelector
                title={group.name}
                options={groups}
                renderOption={renderGroup}
                select={selectGroup}
                searchKeys={['name']}
              />
            </div>
          </div>
        </div>
        <div className="buttons">
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

export default connect(({ users }) => ({ users }))(AddBill)
