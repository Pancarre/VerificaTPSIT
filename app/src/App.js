import logo from './logo.svg';
import './App.css';
import {useState} from 'react';


function App() {

  const [registrazione, setRegistrazione] = useState(false);
  const [login, setLogin] = useState(false);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [token, setToken] = useState("");
  const [date, setDate] = useState("");
  const [menu, setMenu] = useState(true);


  async function salvaRegistrazione(){

    const response = await fetch("http://localhost:8080/signup", 
        {
            method: "POST",

            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({username: username, password: password, email : email})
        });

        const data = await response.json();
        
        if(data.status == true){

          setFeedback("registrazione a buon fine");

        }
        
        else{

          setFeedback("dati non validi o errore di registrazione");

        }
        setPassword("");
        setEmail("");
        setUsername("");
  }



  async function effettuaLogin(){

    const response = await fetch("http://localhost:8080/login", 
        {
            method: "POST",

            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({username: username, password: password})
        });

        const data = await response.json();
        setToken(data.token);
        setMenu(false);
        getDatiUtenti(data.token);
  }

  async function getDatiUtenti(token){

    const response = await fetch(`http://localhost:8080/user/${token}`,{method: "GET",});
    const data = await response.json();
    setMenu(false);
    setId(data.id);
    setUsername(data.username);
    setToken(data.token);
    setEmail(data.email);
    setDate(data.reg_date)

  }

  function gestisciregistra(){

    setRegistrazione(true);
    setLogin(false);

  }

  function gestisciLogin(){
    setRegistrazione(false);
    setLogin(true);

  }

  function gestisciUsername(e){

    setUsername(e.target.value);

  }

  function gestisciPassword(e){

    setPassword(e.target.value);


  }

  function gestisciEmail(e){

    setEmail(e.target.value);

  }

  return (
    <div className="App">

      {
        menu ?
          <div>
            {
              !registrazione ?
                <div>
                  <button onClick={gestisciregistra}>REGISTRA</button>
                </div>
              :
                <div>

                  <h1>Registrazione</h1>
                  Username: <input type="text" placeholder="Inserisci Username" value={username} onChange={gestisciUsername}></input><br></br>
                  password: <input type="password" placeholder="Inserisci il password" value={password} onChange={gestisciPassword}></input><br></br>
                  email: <input type="text" placeholder="Inserisci il email" value={email} onChange={gestisciEmail}></input><br></br>

                  <button onClick={salvaRegistrazione}>registra</button>

                  <p>{feedback}</p>

                </div>
            }
            {
              !login ?
                <div>

                  <button onClick={gestisciLogin}>LOGIN</button>

                </div>

              :
                <div>

                  <h1>Login</h1>

                  Username: <input type="text" placeholder="Inserisci Username" value={username} onChange={gestisciUsername}></input><br></br>
                  password: <input type="password" placeholder="Inserisci il password" value={password} onChange={gestisciPassword}></input><br></br>

                  <button onClick={effettuaLogin}>login</button>

                </div>

            }


          </div>  

        :
            <div>
              {
                setToken &&
                  <>
                  <span>Username:   </span>{username}<br></br>
                  <span>Email:   </span>{email}<br></br>
                  <span>Token:   </span>{token}<br></br>
                  <span>reg_date:   </span>{date}<br></br>
                  </>
              }

            </div>
      }


      
      
      


    </div>
  );
}

export default App;
