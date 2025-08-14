// src/components/ConfirmationModal.jsx
import { useEffect } from 'react';

const ConfirmationModal = ({ 
  isOpen,
  message, 
  onConfirm, 
  onCancel
   
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <p className="mb-4 text-gray-800 dark:text-gray-200">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;