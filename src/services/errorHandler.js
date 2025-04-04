// Error Handler Service
import { toast } from 'react-toastify';

// Error types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTHENTICATION_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  DATABASE: 'DATABASE_ERROR',
  API: 'API_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// Error messages
const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK]: 'Network connection error. Please check your internet connection.',
  [ERROR_TYPES.AUTH]: 'Authentication error. Please log in again.',
  [ERROR_TYPES.VALIDATION]: 'Invalid input data. Please check your entries.',
  [ERROR_TYPES.DATABASE]: 'Database operation failed. Please try again.',
  [ERROR_TYPES.API]: 'API request failed. Please try again later.',
  [ERROR_TYPES.UNKNOWN]: 'An unexpected error occurred. Please try again.'
};

class ErrorHandler {
  constructor() {
    this.errorLog = [];
  }

  // Handle errors and show appropriate UI feedback
  handleError = (error, type = ERROR_TYPES.UNKNOWN) => {
    const errorInfo = {
      timestamp: new Date(),
      type,
      message: error.message || ERROR_MESSAGES[type],
      stack: error.stack
    };

    // Log error
    this.logError(errorInfo);

    // Show UI notification
    this.showErrorNotification(errorInfo);

    // Return false to indicate error handling complete
    return false;
  };

  // Log error for debugging
  logError = (errorInfo) => {
    this.errorLog.push(errorInfo);
    console.error('Error:', errorInfo);

    // Keep only last 100 errors in memory
    if (this.errorLog.length > 100) {
      this.errorLog.shift();
    }
  };

  // Show error notification to user
  showErrorNotification = (errorInfo) => {
    toast.error(errorInfo.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  // Get error message based on type
  getErrorMessage = (type) => {
    return ERROR_MESSAGES[type] || ERROR_MESSAGES[ERROR_TYPES.UNKNOWN];
  };

  // Check if error is network related
  isNetworkError = (error) => {
    return !navigator.onLine || error.message.includes('network') || error.message.includes('Network');
  };

  // Check if error is authentication related
  isAuthError = (error) => {
    return error.message.includes('auth') || error.message.includes('unauthorized') || error.status === 401;
  };

  // Handle API errors
  handleApiError = (error) => {
    if (this.isNetworkError(error)) {
      return this.handleError(error, ERROR_TYPES.NETWORK);
    }
    if (this.isAuthError(error)) {
      return this.handleError(error, ERROR_TYPES.AUTH);
    }
    return this.handleError(error, ERROR_TYPES.API);
  };

  // Handle database errors
  handleDatabaseError = (error) => {
    return this.handleError(error, ERROR_TYPES.DATABASE);
  };

  // Handle validation errors
  handleValidationError = (error) => {
    return this.handleError(error, ERROR_TYPES.VALIDATION);
  };

  // Get error log
  getErrorLog = () => {
    return this.errorLog;
  };

  // Clear error log
  clearErrorLog = () => {
    this.errorLog = [];
  };
}

export const errorHandler = new ErrorHandler();
export default errorHandler; 