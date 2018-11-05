import { useState } from 'react'
import { parseDate, optional } from '../utils'
import { currency } from '../config'

export default ({ bill }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className="box" onClick={toggleExpanded}>
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
      <style jsx>{`
        .box {

          padding: 10px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          cursor: pointer;
        }

        .content {
          display: flex;
          justify-content: space-between;
        }

        .column {
          display: flex;
          flex-direction: column;
        }

        .expanded {
          color: #888;
          margin-top: 10px;
        }

        .to-right {
          align-items: flex-end;
        }

        .minor {
          font-size: 13px;
          margin-bottom: 2px;
          color: #888;
        }

        .medium {
          font-size: 16px;
        }

        .large {
          font-size: 18px;
        }
      `}</style>
    </div>
  )
}
