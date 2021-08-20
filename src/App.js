import logo from './logo.svg';
import './App.css';
import axios from "axios"
import https from 'https'

function App() {
  const logIn = async () => {
    let url = "https://localhost:8080/test/cox";
    const agent = new https.Agent({  
  rejectUnauthorized: false
});
    try{
        const res = await axios.get(url,{
          auth:{
            username:'user',
            password:'639f54db-e8fd-440d-abc5-60be377962d0'
          }
        ,
        headers:{
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Credentials':true
        },
        httpsAgent:agent
      })
        return res;
    }catch(err){
        console.log(err)
    }
    
}
  return (
    <div className = "App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={()=>console.log(logIn())}>Butonul</button>
      </header>
    </div>
  );
}

export default App;
