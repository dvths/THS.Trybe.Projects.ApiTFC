import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize';
import User from '../database/models/User';
import * as mock from './mocks-stubs/login-mocks';

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
    beforeEach(() => sinon.stub(Model, 'findOne').resolves(null));

    afterEach(() => sinon.restore());

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
    beforeEach(() =>
      sinon.stub(Model, 'findOne').resolves(mock.login.data as User)
    );

    afterEach(() => sinon.restore());

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
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(mock.login.requests.user as User);
    });
    afterEach(() => sinon.restore());

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

describe('GET /login/validate', () => {
  describe('Quando o token não é enviado:', () => {
    it('Deve retornar status 401 e a mensagem adequada', async () => {
      const { status, body } = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', '');
      expect(status).to.equal(401);
      // expect(body).to.deep.equal({ message: 'Token must be a valid token' });
      expect(body).to.deep.equal(mock.login.jwtAuth.errorMessage);
    });
  });
  describe('Quando o token é invalido:', () => {
    it('Deve retornar status 401 e a mensagem adequada', async () => {
      const { status, body } = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'invalid_token');
      expect(status).to.equal(401);
      expect(body).to.deep.equal(mock.login.jwtAuth.errorMessage);
    });
  });
  describe('Quando o token é válido', () => {
    beforeEach(() => sinon.stub(jwt, 'verify').callsFake(() => {
      return mock.login.jwtAuth.payload;
    }))
    afterEach(() => sinon.restore());
    it('Deve retornar status 200 e objeto com a chave "role"', async ()=> {
      const { status, body } = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'valid_token');
      expect(status).to.equal(200);
      expect(body).to.deep.equal({ role: 'user' });
    })
  })
});
