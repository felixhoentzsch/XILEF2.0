import { useRouter } from "next/router"
import { useState } from "react"
import axios from "axios"

export default function loginCreate() {

    const [benutzer, setBenutzer] = useState(null);
    const [passwort, setPasswort] = useState(null);
    const [error, setError] = useState(false);
    const router = useRouter();

    const login = async () =>{
        // alert(benutzer + " " + passwort)
        try{    
            await axios.get("http://localhost:3000/api/login",{
                benutzer,
                passwort
            })
            console.log("geht")
            router.push("/")
        }catch(error){
            setError(true)
        }
    }
        

  return (

    <div className="form-container">
        <div className="headline">
            <div className="brand">xilef
            </div>	
            <div>
                <p>Anlegen einer neuen Studie</p>
            </div>
            {/* style="	font-size: 18px; font-weight: bold;" */}
            <div className="hr-container">
                <p className="hr-vert-small"></p>
            </div>	
            
                <div className="form-group">
                {error && <p>Login fehlgeschlagen</p>}
                    <label for="name">Benutzername: </label> 
                    <div className="tooltip"><button >?</button>
                         {/* style="height:25px; width: 25px;" */}
                        <span className="tooltiptext">Benutzen Sie die vorläufigen <br/> Anmeldedaten!</span>
                     </div>
                    <span className="input-span"><input type="text" name="login-name" onChange={(e) => setBenutzer(e.target.value)}></input></span>
                </div>
                <div className="form-group">
                    <label for = "password">Passwort: </label> 
                    <span className="input-span"><input type="password" name="login-password" onChange={(e) => setPasswort(e.target.value)}></input></span>
                </div>
                <div className="form-group">
                    <button name="login" onClick={login}>LOGIN</button>
                </div>
	
        </div>
	</div>
  )
}
