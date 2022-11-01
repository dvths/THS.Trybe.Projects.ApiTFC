import * as chai from 'chai';
import * as sinon from 'sinon';
// import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize';
import User from '../database/models/User';
import * as mock from './mocks-stubs';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('Quando o campo "email" não é informado: ', () => {
    it('Deve retornar status 400 e a mensagem adequada.', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(mock.login.requests.emptyEmail);
      expect(status).to.equal(400);
      expect(body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  });

  describe('Quando o campo "password" não é informado:', () => {
    it('Deve retornar status 400 e a mensagem adequada.', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(mock.login.requests.emptyPassword);
      expect(status).to.equal(400);
      expect(body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  });

  describe('Quando o email é informado e não existe no banco:', () => {
    before(() => sinon.stub(Model, 'findOne').resolves(null));

    after(() => sinon.restore());

    it('Deve retornar um erro 401 e a mensagem adequada', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(mock.login.requests.emailNonExist);
      expect(status).to.equal(401);
      expect(body).to.deep.equal({
        message: 'Incorrect email or password',
      });
    });
  });

  describe('Quando o email informado existe no banco e a senha é incorreta:', () => {
    before(() =>
      sinon.stub(Model, 'findOne').resolves(mock.login.data as User)
    );

    after(() => sinon.restore());

    it('Deve retornar um erro 401 e a mensagem adequada', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(mock.login.requests.wrongPassword);
      expect(status).to.equal(401);
      expect(body).to.deep.equal({
        message: 'Incorrect email or password',
      });
    });
  });

  describe('Quando as credenciais estão corretas', () => {

    before(() => {
      sinon.stub(Model, 'findOne').resolves(mock.login.requests.user as User);
    });
    after(() => sinon.restore());

    it('Deve retornar status 200 e um token no corpo da requisição', async () => {
      const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(mock.login.data);
      expect(status).to.equal(200);
      expect(body).to.have.key('token');
    });
  });
});
