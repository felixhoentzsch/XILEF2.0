import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
    const [benutzer, setBenutzer] = useState("");
    const [passwort, setPasswort] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const login = async (e) => {
        setError("")
        e.preventDefault();
        try {
            await axios.post("https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/loginAdmin", {
                benutzer,
                passwort
            })
            // alert("ERfolgreich")
            router.push("/backend/login")
        } catch (error) {
            setError("Login fehlgeschlagen. Bitte überprüfen Sie ihre Anmeldedaten")
        }
    }

    return (
        <div className="form-container">
            <div className="headline">
            <h1>Login</h1>
            <div class="hr-container">
            <p class="hr-vert"/>
        </div>
            <form>
                <div className="form-group">
                {error && <p className="error-message">{error}</p>}
                    <label for="name">Benutzername: </label> 
                    <span className="input-span"><input type="text" name="login-name" onChange={(e) => setBenutzer(e.target.value)}></input></span>
                </div>
                <div className="form-group">
                    <label for = "password">Passwort: </label> 
                    <span className="input-span"><input type="password" name="login-password" onChange={(e) => setPasswort(e.target.value)}></input></span>
                </div>
                <div className="form-group">
                    <button onClick={login} name="login">Login</button>
                </div>
            </form>
            </div>
        </div>
    )
}

