import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import chaiHttp from 'chai-http';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('Quando o campo "email" não é informado: ', () => {
    let httpResponse: Response;
    it('Deve retornar status 400 e a mensagem adequada.', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: '', password: 'any_pass' });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  });

  describe('Quando o campo "password" não é informado: ', () => {
    let httpResponse: Response;
    it('Deve retornar status 400 e a mensagem adequada.', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@email.com', password: '' });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  });
  describe('Quando a requisição é feita com sucesso: ', () => {
    let httpResponse: Response;
    it('Deve retornar status 201', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'any_email@email.com', password: 'any_pass' });
      expect(httpResponse.status).to.equal(201);
    });
  });
});
