import { useState, useEffect } from 'react';
import './Modal.css'; // Asegúrate de tener los estilos CSS adecuados

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleIframeMessage = (event) => {
    // Este evento se activa cuando el iframe envía un mensaje
    console.log('Mensaje recibido desde el iframe:', event.data);
  };

  useEffect(() => {
    // Agregar el event listener para escuchar mensajes desde el iframe
    window.addEventListener('message', handleIframeMessage);

    return () => {
      // Remover el event listener cuando el componente se desmonta
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <div className="app">
      <button
        className="open-button"
        onClick={openModal}
      >
        Abrir Modal
      </button>
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
          <button
            className="close-button"
            onClick={closeModal}
          >
            Cerrar
          </button>
          <div className="iframe-container">
            <iframe
              title="Página Ejemplo"
              src="https://www.claro.com.co/personas/"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
