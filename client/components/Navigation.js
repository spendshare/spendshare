import { primaryColor } from '../config'
import Button from './Button'

export default () => (
  <div className="navigation">
    <Button title="Sign out" light />
    <style jsx>{`
      .navigation {
        height: 60px;
        width: 100%;
        padding: 10px;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box;
      }
    `}</style>
  </div>
)
