import React, { useState } from 'react'
import './Bill.scss'
import { parseDate } from '../utils'
import { currency } from '../config'

export default ({ bill }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className="bill" onClick={toggleExpanded}>
      <div className="content">
        <div className="column">
          <span className="minor">{parseDate(bill.date)}</span>
          <span className="large">{bill.title}</span>
        </div>
        <div className="column to-right">
          <span className="minor">{bill.paid.name} paid</span>
          <div className="medium">
            <span>{bill.paid.amount}</span>
            {' '}
            <span>{currency}</span>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="expanded">
          More info will come here...
        </div>
      )}
    </div>
  )
}
