import React, { useState, useEffect, createRef } from 'react'
import './AddBill.scss'
import { sleep } from '../utils'
import { currency, fontFamily, primaryColor, dark } from '../config'

import BadgeSelector from './BadgeSelector'
import Button from './Button'
import DropdownSelector from './DropdownSelector'
import Input from './Input'
import Suggestion from './Suggestion'
import TextSuggestion from './TextSuggestion'

const url = 'http://localhost:3000/api/save/asd'

const groups = [{
  id: 1,
  name: 'Chińczyk',
}, {
  id: 2,
  name: 'Meksykanin',
}]

export default function({ hide }) {
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState([])
  const [payer, setPayer] = useState({ name: 'You' })
  const [group, setGroup] = useState(groups[0] || { name: 'No group' })
  let ref = createRef()
  // useEffect(() => {
  //   const handleClick = event => {
  //     if (ref && !ref.contains(event.target)) hide()
  //   }
  //   window.addEventListener('click', handleClick)
  //   return () => window.removeEventListener('click', handleClick)
  // })
  useEffect(() => {
    const handleKeyDown = ({ keyCode }) => {
      if (keyCode === 27) hide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const save = async () => {
    setLoading(true)
    await sleep(400)
    setLoading(false)
    hide()
  }

  const splittingWay = 'equally'

  const suggested = [{
    id: 1,
    name: 'Aleksander Mikucki',
    email: 'mikucki@gmail.com',
  }, {
    id: 2,
    name: 'Wojciech Kozyra',
    email: 'kozyra@gmail.com',
  }]

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
      <div className="box" ref={node => {ref = node}}>
        <div className="cross" onClick={hide}>✕</div>
        <div className="title">
          Add a bill
        </div>
        <BadgeSelector
          suggested={suggested}
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
              placeholder="Enter a description..."
            />
            <Input
              biggerText
              className="input"
              label="Amount"
              placeholder="0.00"
              right={currency}
            />
            <div className="descriptive">
              Paid by{' '}
              <DropdownSelector
                title={payer.name}
                options={[{ name: 'You' }, ...selected]}
                renderOption={renderPerson}
                select={selectPayer}
                searchKeys={['name']}
              />
              {' '}and split{' '}
              equally
              {/* <DropdownSelector
                title={splittingWay}
              /> */}
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
            <Button
              title="Cancel"
              onClick={hide}
              light
            />
          </div>
          <div>
            <Button
              title="Save"
              onClick={save}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
