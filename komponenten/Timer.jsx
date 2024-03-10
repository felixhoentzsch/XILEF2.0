import React from 'react'
import { useState, useEffect } from 'react';
import { signOut } from "next-auth/react";

export default function Timer() {

    const [timeLeft, setTimeLeft] = useState(15 * 60); // Startzeit in Sekunden
    const [showClock, setShowClock] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
  
      const resetTimer = () => {
        setShowPopup(false);
        setShowClock(false);
        setTimeLeft(15 * 60);
      };
      
      // Event-Listener für Maus- und Tastaturaktionen
      document.addEventListener('click', resetTimer);
      document.addEventListener('keydown', resetTimer);

      return () => {
        clearInterval(interval);
        document.removeEventListener('click', resetTimer);
        document.removeEventListener('keydown', resetTimer);
      };
    }, []);
  
    useEffect(() => {
      if (timeLeft === 1 * 60) {
        setShowPopup(true);
      }
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft === 2 * 60) {
          setShowClock(true);
        }
      }, [timeLeft]);
  
    useEffect(() => {
      if (timeLeft === 0) {
        handleNavigation();
      }
    }, [timeLeft]);
  
    const handleNavigation = () => {
      // Hier die Funktion signOut() implementieren
      signOut({ callbackUrl: '/home' });
    };
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

  return (
<>
    {showClock && 
    <div style={{ position: "fixed",
    top: "0",
    right: "5%",
    zIndex: "1000", // Z-Index anpassen, um über anderen Elementen zu liegen
    textAlign: "right"}}>
        <div>
            {showPopup && 
                <div style={{
                    position: "absolute",
                    right: "0%",
                    marginTop: "35px",
                    whiteSpace: "nowrap"
                }}>
                    <span 
                        style={{
                            width: "200px",
                            backgroundColor: "#f2aa35a6",
                            color: "#fff",
                            textAlign: "center",
                            borderRadius: "6px",
                            padding: "5px 5px",
                        }}> 
                        Zeit bis Logout
                    </span>
                </div>}
            <div>
                <p>
                    {formatTime(timeLeft)}
                </p>
            </div>
        </div>
    </div>}
</>
  )
}