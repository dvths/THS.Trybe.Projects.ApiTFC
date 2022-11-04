import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
import * as loginMock from './mocks-stubs/login-mocks';
import * as mock from './mocks-stubs/matches-mock';

import { Model } from 'sequelize';
import { app } from '../app';
import { IMatches } from '../Interfaces/Matches/IMatch';
import Match  from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  describe('Quando a rota é acessada corretamente:', () => {
    beforeEach(() =>
      sinon.stub(Model, 'findAll').resolves(mock.allMatches as IMatches[])
    );
    afterEach(() => sinon.restore());

    it('Deve retornar o status 200 e alistagem de partidas', async () => {
      const { status, body } = await chai.request(app).get('/matches');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mock.allMatches);
    });
  });
});

describe('GET /matches?inProgress=', () => {
  describe('Quando a partida está em andamento', () => {
    beforeEach(() =>
      sinon.stub(Model, 'findAll').resolves(mock.inProgress as IMatches[])
    );
    afterEach(() => sinon.restore());

    it('Deve retornar o status 200 e a lista de partidas em progresso', async () => {
      const { status, body } = await chai
        .request(app)
        .get('/matches?inProgress=true');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mock.inProgress);
    });
  });

  describe('Quando a partida está finalizada', () => {
    beforeEach(() =>
      sinon.stub(Model, 'findAll').resolves(mock.finished as IMatches[])
    );
    afterEach(() => sinon.restore());

    it('Deve retornar o status 200 e a lista de partidas em progresso', async () => {
      const { status, body } = await chai
        .request(app)
        .get('/matches?inProgress=false');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mock.finished);
    });
  });
});

describe('POST /matches', () => {
  describe('Ao acessar a rota sem token de autorização:', () => {
    it('Deve retornar status 401 e a mensagem adequada', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('authorization', '');
      expect(status).to.equal(401);
      expect(body).to.deep.equal({
        message: 'Token must be a valid token',
      });
    });
  });

  describe('Ao tentar cadastrar dois times iguais:', () => {
    beforeEach(() =>
      sinon.stub(jwt, 'verify').callsFake(() => {
        return loginMock.login.jwtAuth.payload;
      })
    );
    afterEach(() => sinon.restore());

    it('Deve retornar status 422 e a mensagem adequada', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'invalid-token')
        .send(mock.createInvalidMatch);
      expect(status).to.equal(422);
      expect(body).to.deep.equal({
        message: 'It is not possible to create a match with two equal teams',
      });
    });
  });

  describe('Ao tentar cadastrar uma partida com time inexistente:', () => {
    beforeEach(() => {
      sinon.stub(jwt, 'verify').callsFake(() => {
        return loginMock.login.jwtAuth.payload;
      });
      sinon.stub(Model, 'findByPk').resolves(null)
    });
    afterEach(() => sinon.restore());
    
    it('Deve retornar status 404 e a mensagem adequada', async () => {
      const {status, body } = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'valid_token')
        .send(mock.createMatchWithInvalidTeam)
      expect(status).to.equal(404);
      expect(body).to.deep.equal({
        message: 'There is no team with such id!'
      });
    });
  });

  describe('Ao cadastrar uma partida com sucesso:', () => {
    beforeEach(() => {
      sinon.stub(jwt, 'verify').callsFake(() => {
        return loginMock.login.jwtAuth.payload;
      });
      sinon.stub(Model, 'create').resolves(mock.createdMatchMock as Match)
    });
    afterEach(() => sinon.restore());
    
    it('Deve retornar status 201 e os dados da requisição com id', async () => {
      const {status, body } = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'valid_token')
        .send(mock.createMatchMock)
      expect(status).to.equal(201);
      expect(body).to.deep.equal(mock.createdMatchMock);
    });
  });
});

describe('PATCH /matches/:id/finish', () => {
  describe('Testa se uma partida é finalizada com sucesso', () => {
    beforeEach(() => sinon.stub(Model, 'update'));
    afterEach(() => sinon.restore);
    it('Deve retornar o status 200 e a mensagem adequada', async () => {
      const { status, body } = await chai
      .request(app)
      .patch('/matches/41/finish');
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal({
        message: 'Finished'
     });
    });
  });
});
