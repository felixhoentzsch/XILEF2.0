import React, {useState} from 'react'
import Modal from 'react-modal';


Modal.setAppElement('#__next');


export default function FirstLoginPopUp({isOpen, onClose, onSave}) {

    const [studienName, setStudienName] = useState('');
    const [zentrumID, setZentrumID] = useState('');
  
    const handleSave = () => {
      onSave({ studienName, zentrumID });
      onClose();
    };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Studiennamen und Zentrum-ID eingeben</h2>
      <input
        type="text"
        placeholder="Studiennamen"
        value={studienName}
        onChange={(e) => setStudienName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Zentrum-ID"
        value={zentrumID}
        onChange={(e) => setZentrumID(e.target.value)}
      />
      <button onClick={handleSave}>Speichern</button>
    </Modal>
  );
}
