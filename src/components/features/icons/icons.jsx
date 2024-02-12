import React from 'react';

const EmptyHeartIcon = ({filled}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? 'red' : 'none'}
      viewBox="0 0 28 28"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={filled ? '1.5' : "2"}
        d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C15.09 2.81 16.76 2 18.5 2 21.58 2 24 4.42 24 7.5c0 3.78-3.4 6.75-8.55 12.54L12 21.35z"
      />
    </svg>
  );
};

const RedHeartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="red"
      viewBox="0 0 24 24"
      stroke="red"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C15.09 2.81 16.76 2 18.5 2 21.58 2 24 4.42 24 7.5c0 3.78-3.4 6.75-8.55 12.54L12 21.35z"
      />
    </svg>
  );
};

export { EmptyHeartIcon, RedHeartIcon };
