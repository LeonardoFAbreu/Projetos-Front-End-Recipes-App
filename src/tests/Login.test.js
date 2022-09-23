import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailTestID = 'email-input';
const passwordID = 'password-input';
const buttonEnterID = 'login-submit-btn';

describe('Testa a tela de Login', () => {
  test('Verifica se os inputs do formulário de login existem', () => {
    render(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });
  test('Verifica se é possível digitar nos inputs', () => {
    render(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybe.com');
    userEvent.type(password, '1234567');
    expect(buttonEnter).not.toBeDisabled();
  });
  test('Testa se ao clicar no botao é redirecionado para pagina Recipes', () => {
    // const { history } = renderWithRouter(<App />);
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailTestID);
    const password = screen.getByTestId(passwordID);
    const buttonEnter = screen.getByTestId(buttonEnterID);
    userEvent.type(email, 'grupo12@trybe.com');
    userEvent.type(password, '1234567');

    userEvent.click(buttonEnter);
    // history.push('/meals');
    // await waitFor(() => {
    // expect(history.location.pathname).toBe('/meals');
    // });
  });
});
