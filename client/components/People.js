import User from './User'

const users = [{
  balance: -120,
  email: 'tomek.czajecki@gmail.com',
  id: 100,
  name: 'Tomek Czajęcki',
}, {
  balance: 0,
  email: 'supesetle@gmail.com',
  id: 50,
  name: 'Michał Osadnik',
}, {
  balance: 20,
  email: 'mikucki@gmail.com',
  id: 51,
  name: 'Aleksander Mikucki',
}, {
  balance: -500,
  email: 'mikucki@gmail.com',
  id: 1,
  name: 'Tomasz Sapeta',
}, {
  balance: 57,
  email: 'mikucki@gmail.com',
  id: 2,
  name: 'Kamil Świerad',
}]

export default () => (
  <div className="people">
    {users.map(u => <User key={`user-${u.id}`} user={u} />)}
    <style jsx>{`
      .people {
        padding: 60px 0 0 20px;
        width: 250px;
      }
    `}</style>
  </div>
)
