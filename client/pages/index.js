import Navigation from '../components/Navigation'
import Bills from '../components/Bills'
import People from '../components/People'
import { fontFamily } from '../config'

export default () => (
  <div className="page">
    <Navigation />
    <Bills />
    <People />
    <style jsx>{`
      @import url('https://fonts.googleapis.com/css?family=${fontFamily}:400&subset=latin-ext');

      div {
        font-family: '${fontFamily}', sans-serif;
        font-size: 16px;
      }

      .page {
        padding-top: 20px;
        margin: 50px auto;
        display: flex;
        width: 800px;
      }
    `}</style>
  </div>
)
