import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  
  const [users, setUsers] = useState([]) 

  useEffect(() => {
    // for demo purposes, hardcoded URL
    axios.get('/users').then(res => {
      console.log(res.data);
      setUsers(res.data)
    })
  }, [])

  return (
    <div className="App">
      
        {users.map(user => <h1 key={user.id}>{user.email}</h1>)}
      
    </div>
  );
}

export default App;