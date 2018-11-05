import { getAvatar } from '../utils'

export default ({ user, handleClick }) => (
  <div className="selected" onClick={handleClick}>
    <div className="avatar">
      <img src={getAvatar(user)} />
    </div>
    <div className="name">{user.name}</div>
    <style jsx>{`
      .selected {
        cursor: pointer;
        display: flex;
        background-color: #eee;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        border-radius: 13px;
        padding: 0 8px 0 32px;
        margin: 0 5px 5px 0;
        position: relative;
      }

      .avatar {
        position: absolute;
        left: 2px;
        top: 2px;
        width: 22px;
        height: 22px;
        border-radius: 13px;
        background-color: #aaa;
      }

      img {
        width: 22px;
        height: 22px;
        border-radius: 100%;
      }

      .name {
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}</style>
  </div>
)
