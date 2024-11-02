import React from 'react';

import Modal from '../modal';

// ~~~~~~ Types

interface Props {
  isOpen?: boolean;
  onClose(): void;
  isEditMode?: string;
}

// ~~~~~~ Component

export function VariantForm({ isOpen, isEditMode, onClose }: Props) {
  // ~~~~~~ Render

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={isEditMode ? 'Edit variant' : 'Add variant'}
    >
      ProductForm
    </Modal>
  );
}
