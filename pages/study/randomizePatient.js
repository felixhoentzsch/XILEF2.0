import React from 'react'
import { useRouter } from 'next/router'
import Spacer from '@/komponenten/Spacer';

export default function RandomizePatient() {

    const router = useRouter();
    const { Name, Zentrum, Behandlung, createdAt} = router.query;

    const handleNavigation = () => {
        router.push('/study/mainMenu')
    }  

    function handlePrint() {
        if (typeof window !== 'undefined') {
          window.print();
        }
      }

  return (
    <div className='text-container'>
        <div className='sucsess-message'>Patient erfolgreich randomisiert</div>
        <h2>Angaben des Patienten</h2>

        <Spacer/>

        <table>
            <thead>
                <tr>
                    <th>Attribut</th>
                    <th>Wert</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Patienten ID</td>
                    <td>{Name}</td>
                </tr>
                <tr>
                    <td>randomisierendes Zentrum</td>
                    <td>{Zentrum}</td>
                </tr>
                <tr>
                    <td>zugewiesene Behandlung</td>
                    <td>{Behandlung}</td>
                </tr>
                <tr>
                    <td>Zeitstempel</td>
                    <td>{createdAt} GMT</td>
                </tr>
            </tbody>
        </table>

        <Spacer/>

        <div style={{display:'flex', gap:'20px', justifyContent:'center'}}>
            <button
                type="submit"
                onClick={handleNavigation}
                className="btn btn-primary">
                Zurück
            </button>
            <button 
                className = "btn btn-primary"
                onClick={handlePrint}>
                Drucken
            </button>
        </div>
        
    </div>
   
  )
}
