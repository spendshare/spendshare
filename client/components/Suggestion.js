import { getAvatar } from '../utils'

export default ({ user, onClick }) => (
  <div
    className="suggestion"
    onClick={onClick}
  >
    <div className="avatar">
      <img src={getAvatar(user)} />
    </div>
    <span className="name">{user.name}</span>
    <style jsx>{`
      .suggestion {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        padding: 0 5px;
        display: flex;
        align-items: center;
      }

      .suggestion:hover {
        background-color: #f5f5f5;
      }

      .avatar {
        border-radius: 100%;
        background-color: #ddd;
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }

      .name {
        font-size: 15px;
      }

      img {
        width: 30px;
        height: 30px;
        border-radius: 100%;
      }
    `}</style>
  </div>
)
