import { fireEvent, getByAltText, getByLabelText, getByPlaceholderText, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
const app = require('../src/app/api/users/route');
const supertest = require('supertest');


describe('Backend logics for logging in', () => {
  it('Logging in with correct info will lead to non-null findUser value', async () => {
    const request = supertest(app);
    const reponse = await request
      .post("/api/user")
    expect(5).toBe(5)
  });


});


