import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="w-full max-w-lg bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg relative animate-fade-in-up" role="alert">
      <strong className="font-bold text-red-900">Oops! </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;