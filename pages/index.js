import React from 'react';
import { useEffect } from 'react';

// Überprüfen Sie, ob das Fenster vorhanden ist, um sicherzustellen, dass der Code nur im Clientseitigen Teil ausgeführt wird
const Index = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/home'; // Weiterleitung nach 15 Sekunden
    }, 3000); // 3 Sekunden in Millisekunden

    return () => clearTimeout(timer); // Timer löschen, wenn die Komponente unmontiert wird
  }, []);

  return (
    <div className="animated-title">
      <div className="text-top">
        <div>
          <span>xilef</span>
          <span>randomization</span>
        </div>
      </div>
      <div className="text-bottom">
        <div>let's get started</div>
      </div>
    </div>
  );
};


export default Index;