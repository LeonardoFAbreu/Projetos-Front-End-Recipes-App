import React from 'react';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <main>
      <section className="container-fluid bg-login">
        <div className="row justify-content-center align-items-center h100">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
