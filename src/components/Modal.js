import React from 'react'
import ReactDom from 'react-dom'
import './Modal.css'

export default function Modal({open, onClose, children}) {
  if (!open) return null;

    return ReactDom.createPortal(
    <>
        <div className='modal'>
          <div className='modal_overlay' onClick={onClose}/>
          <div className='modal_content'>
            {children}
          </div>
        </div>
    </>,
    document.getElementById('portal')
  )
}
