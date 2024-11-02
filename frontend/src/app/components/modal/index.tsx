'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';

// ~~~~~~ Types

interface Props {
  onClose(): void;
  isOpen?: boolean;
  modalTitle: string;
  children: ReactNode;
}

// ~~~~~~ Component

function Modal({ isOpen, onClose, modalTitle, children }: Props) {
  // ~~~~~~ Computed

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  // ~~~~~~ Render

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
            role="dialog"
            aria-modal="true"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
          >
            <motion.div
              exit="exit"
              initial="hidden"
              animate="visible"
              variants={modalVariants}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-lg w-full"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{modalTitle}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  &times;
                </button>
              </div>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Modal;
