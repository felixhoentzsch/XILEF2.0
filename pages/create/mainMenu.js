"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


import Link from "next/link"
import styles from '../../styles/Button.module.css'
import { useState } from "react"


import Popup from '../../komponenten/FirstLoginPopUp'


export default function mainMenu() {

    const {data:session} = useSession();
    console.log({data:session}) 


    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState(null);
  
    const handleSave = (data) => {
      // Hier können Sie die Daten verarbeiten, z.B. an die API senden
      setFormData(data);
    }
    

    if (session) {
        // Session is still loading or user is not logged in
        return <div>Session ist da</div>;
      }
    
    //   // Check if user data exists in the session
    //   if (!session.user) {
    //     return <div>User ist auch nicht da</div>;
    //   }
    
    //   // Now you can safely access session.user
    //   const { username, email } = session.user;
    
    //   return (
    //     <div>
    //       <h1>User Profile</h1>
    //       <p>Username: {username}</p>
    //       <p>Email: {email}</p>
    //     </div>
    //   );

    // const test1 = () => {
    //     sessionStorage.setItem("Test", "1");
    // }
    
    
  return (

     <div className='text-container'>
        <h2>Willkommen zum Erstellen <br/> einer neuen Studie</h2>
        <p className="text">{session?.user?.username}Hier sollte eigentlich nen Name stehen </p>
        
        <div className='hr-container'>
            <p className='hr-vert'></p>
        </div>
        <div className="menu-container">
            <span className="welcome">
                <p> Willkommen</p>
            </span>
            <Link href="">
            <button className ={styles.wide}>
                 <p>Stratifizierungskriterien festlegen</p>
            </button>
            </Link>
            <div className="hr-container">
                <p className="hr-vert-small"></p>
              </div>	
            <Link href="">
            <button className ={styles.wide}>
                    <p>Randomisierungsmethoden festlegen</p>
            </button>
            </Link>
            <div className="hr-container">
                <p className="hr-vert-small"></p>
              </div>	
            <Link href="/create/newStaffMember">
            <button className ={styles.wide}>
                    <p>neue Studienaccounts anlegen</p>
            </button>
            </Link>
            <div className="hr-container">
                <p className="hr-vert-small"></p>
              </div>	
            <button onClick={() => signOut()}>Logout</button>  

            {/* <button onClick={test1}> hier </button> */}


            <div>
      <button onClick={() => setIsPopupOpen(true)}>Popup öffnen</button>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSave}
      />
      {formData && (
        <div>
          <p>Studiennamen: {formData.studienName}</p>
          <p>Zentrum-ID: {formData.zentrumID}</p>
        </div>
      )}
    </div>



        </div>
    </div>

   
  )
}



// "use client";

// import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";

// export default function UserInfo() {
//   const { data: local } = useSession();
//   console.log({data: local})

//   return (
//     <div className="grid place-items-center h-screen">
//       <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
//         <div>
//           Name: <span className="font-bold">{local?.user?.username}</span>
//         </div>
//         <div>
//           Email: <span className="font-bold">{local?.user?.mail}</span>
//         </div>
//         <button
//           onClick={() => signOut()}
//           className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
//         >
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// }