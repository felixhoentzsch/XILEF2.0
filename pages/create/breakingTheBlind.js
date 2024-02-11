"use client"

import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Spacer from "@/komponenten/Spacer";
import { useSession } from "next-auth/react";

export default function BreakingTheBlind() {
  const { data: session } = useSession();

  const [messages, setMessages] = useState({
    error: '',
    success: '',
    warning:
      'Mit dem Drücken des Buttons wird Ihnen die Randomiserungsliste der Studie angezeigt.\n Es wird ein Vermerk angefertigt, welcher bestätigt, dass dies geschehen ist.',
  });

  const [list, setList] = useState([]);

  function handlePrint() {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

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
      } else {
        setMessages({ error: 'Fehler beim fetchen der Liste' });
      }
    } catch (error) {
      setMessages({ error: 'Fehler beim übermittlen des Schlüssels' });
    }
  }

  return (
    <div className="text-container">
      {messages.error && (
        <div className="error-message">{messages.error}</div>
      )}
      {messages.success && (
        <div className="sucsess-message">{messages.success}</div>
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
      <button
        type="submit"
        onClick={showList}
        className="btn btn-primary"
      >
        Liste anzeigen
      </button>
      <Spacer />

      <div className="scrollable-container printable-content">
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

      <button onClick={handlePrint}>Drucken</button>

      <div className="spacer" />
    </div>
  );
}
