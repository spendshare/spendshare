import { useState, useEffect, createRef } from 'react'

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
  }, {
    id: 2,
    name: 'Wojciech Kozyra',
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
    <div className="wrapper">
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
        <style jsx>{`
          .wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(150, 150, 150, 0.5);
            position: fixed;
            width: 100vw;
            height: 100vh;
            z-index: 2;
            top: 0;
            left: 0;
          }

          .box {
            background-color: #fff;
            border-radius: 5px;
            width: 350px;
            display: flex;
            flex-direction: column;
            position: relative;
            margin-bottom: 20px;
          }

          .title {
            color: ${dark ? '#000' : '#fff'};
            padding: 0 20px;
            font-size: 20px;
            height: 52px;
            line-height: 52px;
            background-color: ${primaryColor};
            border-radius: 5px 5px 0 0;
          }

          .content {
            padding: 20px;
            color: #888;
            display: flex;
            flex-direction: column;
          }

          .column {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .buttons {
            padding: 10px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: flex-end;
          }

          .buttons div {
            margin-left: 10px;
          }

          .descriptive {
            margin: 10px 0 0;
            display: flex;
            align-items: center;
          }

          .cross {
            cursor: pointer;
            color: ${dark ? '#000' : '#fff'};
            background-color: rgba(${dark ? '0, 0, 0' : '255, 255, 255'}, 0.1);
            border-radius: 100%;
            width: 30px;
            height: 30px;
            line-height: 30px;
            top: 11px;
            right: 11px;
            text-align: center;
            position: absolute;
          }

          .cross:hover {
            background-color: rgba(${dark ? '0, 0, 0' : '255, 255, 255'}, 0.2);
          }
        `}</style>
    </div>
  )
}
