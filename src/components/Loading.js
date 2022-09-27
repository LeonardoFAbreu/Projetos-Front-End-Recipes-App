import React from 'react';

export default function Loading() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="spinner-border text-warning"
          style={ { width: '3rem ', height: '3rem' } }
        />
      </div>
    </div>
  );
}
