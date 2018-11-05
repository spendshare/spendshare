import { currency } from '../config'
import { getAvatar } from '../utils'
import Tooltip from './Tooltip'

const phraseBalance = balance => {
  if (balance === 0) {
    return 'is settled up'
  } else if (balance < 0) {
    return `owes ${Math.abs(balance)} ${currency}`
  } else {
    return `gets back ${balance} ${currency}`
  }
}

export default ({ user }) => (
  <div className="user">
    <div className="avatar">
      <img src={getAvatar(user)} />
    </div>
    <div className="content">
      <div className="name">{user.name}</div>
      <div className="state">{phraseBalance(user.balance)}</div>
    </div>
    <div className="tooltip-wrapper">
      <Tooltip debts={user.debts} />
    </div>
    <style jsx>{`
      .user {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        cursor: default;
        position: relative;
      }

      .tooltip-wrapper {
        position: absolute;
        z-index: 1;
        left: -230px;
        top: 10px;
      }

      .user .tooltip-wrapper {
        display: none;
      }

      .user:hover .tooltip-wrapper {
        display: block;
      }

      .user:hover {
        background-color: #f5f5f5;
      }

      .avatar {
        border-radius: 100%;
        width: 40px;
        height: 40px;
        background-color: #ddd;
        margin-right: 10px;
        flex-shrink: 0;
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
      }

      .content {
        display: flex;
        flex-direction: column;
        width: 180px;
      }

      .name {
        font-size: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .state {
        color: #888;
        font-size: 13px;
      }
    `}</style>
  </div>
)
