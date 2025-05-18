import React from 'react';

function Modal({ show, onClose, videoKey }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top:0, left:0, right:0, bottom:0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} style={{ width: '80%', height: '80%' }}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Modal;
