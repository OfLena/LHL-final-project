

export default function Profile (props) {

const { users } = props
  
  return (
    <div>

      {users.map(user => user.user_name)}
      
    </div>
  )
}