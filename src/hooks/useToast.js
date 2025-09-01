/**
 * Simple toast notification system
 */

let toastListener = null;

export const showToast = (message, type = 'info') => {
  if (toastListener) {
    toastListener({ message, type, id: Date.now() });
  }
};

export const setToastListener = (listener) => {
  toastListener = listener;
};