"use client"

import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Spacer from "@/komponenten/Spacer";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function BreakingTheBlind() {
  const { data: session } = useSession();
  const router = useRouter();

  const [messages, setMessages] = useState({
    error: '',
    success: '',
    warning:
      'Mit dem Drücken des Buttons wird Ihnen die Randomiserungsliste der Studie angezeigt.\n Es wird ein Vermerk angefertigt, welcher bestätigt, dass dies geschehen ist.',
  });

  const [back, setBack] = useState(false)

  const [list, setList] = useState([]);


  async function showList() {
    setMessages({ error: '', success: '' });

    const Benutzer = session?.user?.username;

    const key = {
      Benutzer,
    };
    try {
      const response = await axios.post(
        'https://main.d3qs3j5nnfqi5m.amplifyapp.com/api/fetchList',
        key,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        const listData = response.data;
        setList(listData);
        console.log(listData);
        setMessages({ success: 'Liste erfolgreich angezeigt', warning: '' });
        setBack(true)
      } else {
        setMessages({ error: 'Fehler beim fetchen der Liste' });
      }
    } catch (error) {
      setMessages({ error: 'Fehler beim übermittlen des Schlüssels' });
    }
  }

  const handleNavigation = () => {
    router.push('/create/mainMenu')
}  

function printDiv() {
  const content = document.getElementById('content').innerHTML;
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write('<html><head><title>Druckvorschau</title></head><body>');
  printWindow.document.write(content);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

  return (
    <div className="text-container">
      {messages.error && (
        <div className="error-message">{messages.error}</div>
      )}
      {messages.success && (
        <div className="sucsess-message" style={{marginBottom: '30px'}}>{messages.success}</div>
      )}
      {!list.length && (
        <>
          {messages && messages.warning && (
            <h3>
              <div className="warning-message">
                {messages.warning.split('\n').map((line, index) => (
                  <div key={index}>
                    <React.Fragment>
                      {line}
                      <br/>
                    </React.Fragment>
                  </div>
                ))}
              </div>
            </h3>
          )}
        </>
      )}
      {/* <div className='spacer' style={{rotate: "90deg"}}/> */}

      <div className="scrollable-container" id='content'>
        <div className="horizontal-scroll">
          {list.map((item, index) => (
            index % 20 === 0 && (
              <table key={index} className="randListTable">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Behandlung</th>
                  </tr>
                </thead>
                <tbody>
                  {list.slice(index, index + 20).map((listItem, subIndex) => (
                    <tr key={subIndex}>
                      <td>{index + subIndex + 1}</td>
                      <td>{listItem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ))}
        </div>
      </div>

      <Spacer />
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      {!back &&
      <button
        type="submit"
        onClick={showList}
        className="btn btn-primary">
        Liste anzeigen
      </button>
      } 
      { back &&
        <button
        type="submit"
        onClick={handleNavigation}
        className="btn btn-primary">
        Zurück
      </button>
      }

      <button className = "btn btn-primary"onClick={printDiv}>Drucken</button>

      <div className="spacer" />
    </div>
    </div>
  );
}
