import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import styles from '../styles/Button.module.css';

export default function Home() {
  const [create, setCreate] = useState(false);
  const [study, setStudy] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false); // State für die Überprüfung, ob die Seite geladen ist

  const router = useRouter();

  useEffect(() => {
    // Setze die Opazität auf 1, wenn die Seite geladen ist
    setIsLoaded(true);
  }, []);

  function optionCreate() {
    if (study === true) {
      setStudy(false);
    }
    setCreate(true);
  }

  function optionStudy() {
    if (create === true) {
      setCreate(false);
    }
    setStudy(true);
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      if (res.error) {
        setError('Ungültige Benutzerdaten');
        return;
      }
      router.replace('create/mainMenu');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitStudy = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      if (res.error) {
        setError('Ungültige Benutzerdaten');
        return;
      }
      router.replace('study/mainMenu');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={`form-container`} style={{ flexDirection: 'column', opacity: isLoaded ? 1 : 0, transition: "opacity 0.7s ease-in-out" }}>
        <div className="headline">
          <div className="brand">xilef</div>
          <div>
            <p>ihre Randomisierungssoftware</p>
          </div>
          <div className="trenner" />
        </div>
        <section className="color">
          <nav className="cl-effect">
            <a href="#" onClick={optionCreate}>Login Studie anlegen/bearbeiten</a>
            <a href="#" onClick={optionStudy}>login bestehende Studie</a>
          </nav>
        </section>
        {create &&
          <form onSubmit={handleSubmitCreate}>
            <div className="form-group">
              {error && <p className="error-message">{error}</p>}
              <label htmlFor="name">Benutzername: </label>
              <div className="tooltip">
                <button className={styles.tip} >?</button>
                <span className="tooltiptext">Benutzen Sie bitte die Anmeldedaten <br /> aus der email!</span>
              </div>
              <span className="input-span">
                <input type="text" name="login-name" onChange={(e) => setUsername(e.target.value)}></input>
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="password">Passwort: </label>
              <span className="input-span">
                <input type="password" name="login-password" onChange={(e) => setPassword(e.target.value)}></input>
              </span>
            </div>
            <div className="form-group">
              <button name="login">LOGIN</button>
            </div>
          </form>
        }
        {study &&
          <form onSubmit={handleSubmitStudy}>
            <div className="form-group">
              {error && <p className="error-message">{error}</p>}
              <label htmlFor="name">Benutzername: </label>
              <div className="tooltip">
                <button className={styles.tip} >?</button>
                <span className="tooltiptext">Benutzen Sie bitte die Ihnen mitgeteilten <br /> Anmeldedaten!</span>
              </div>
              <span className="input-span"><input type="text" name="login-name" onChange={(e) => setUsername(e.target.value)}></input></span>
            </div>
            <div className="form-group">
              <label htmlFor="password">Passwort: </label>
              <span className="input-span"><input type="password" name="login-password" onChange={(e) => setPassword(e.target.value)}></input></span>
            </div>
            <div className="form-group">
              <button name="login">LOGIN</button>
            </div>
          </form>
        }
      </div>
    </>
  )
}
