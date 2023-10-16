'use client';

import '@/styles/templates/write/categoryModal.scss';
import React from 'react';

export default function CategoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Hello, I am a Modal</h2>
      </div>
    </div>
  );
}
