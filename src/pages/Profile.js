import React from 'react';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div>
      <Header title="Profile" showSearch={ false } showProfile />
      Profile
    </div>
  );
}
