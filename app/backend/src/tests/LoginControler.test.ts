import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { Model } from 'sequelize';
import User from '../database/models/User';

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

  describe('Quando o usuário já existe no banco de dados', () => {
    let httpResponse: Response;

    const user = { id: 1, email: 'any_email@email.com', password: 'any_pass' };

    before(() => sinon.stub(Model, 'findOne').resolves(user as User))

    after(() => sinon.restore());

    it('Deve retornar um erro 409 e a mensagem adequada', async () => {
      httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'exists@email.com', password: 'any_pass' });
      expect(httpResponse.status).to.equal(409);
      expect(httpResponse.body).to.deep.equal({
        message: 'User already registered!',
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
