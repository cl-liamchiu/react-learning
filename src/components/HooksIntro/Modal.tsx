import React, { useEffect } from 'react';
import './Modal.css';
import UseStateExample from './UseStateExample';
import UseEffectExample from './UseEffectExample';
import UseRefExample from './UseRefExample';
import UseMemoExample from './UseMemoExample';
import UseCallbackExample from './UseCallbackExample';
import { UseContextExample } from './UseContextExample';

interface ModalProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, title, onClose }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('hide-scrollbar');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('hide-scrollbar');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('hide-scrollbar');
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {title === 'useState' && <UseStateExample />}
        {title === 'useEffect' && <UseEffectExample />}
        {title === 'useRef' && <UseRefExample />}
        {title === 'useMemo' && <UseMemoExample />}
        {title === 'useCallback' && <UseCallbackExample />}
        {title === 'useContext' && <UseContextExample />}
        <button onClick={onClose} className="modal-close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
