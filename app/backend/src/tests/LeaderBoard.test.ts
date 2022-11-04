import * as chai from 'chai';
import * as sinon from 'sinon';
// import * as jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { app } from '../app';
import * as mock from './mocks-stubs/leaderboard-mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard/home', () => {
  describe('Quando a rota é acessada com sucesso:', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves(mock.finishedMatches as Match[]);
      sinon.stub(Team, 'findAll').resolves(mock.teams as Team[]);
    });
    afterEach(() => sinon.restore());

    it('Deve retornar status 200 e a listagem de classificação dos times da casa', async () => {
      const { status, body } = await chai.request(app).get('/leaderboard/home');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mock.homeBoard);
    });
  });
});

describe('GET /leaderboard/away', () => {
  describe('Quando a rota é acessada com sucesso:', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves(mock.finishedMatches as Match[]);
      sinon.stub(Team, 'findAll').resolves(mock.teams as Team[]);
    });
    afterEach(() => sinon.restore());

    it('Deve retornar status 200 e a listagem times visitantes', async () => {
      const { status, body } = await chai.request(app).get('/leaderboard/away');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mock.awayBoard);
    });
  });
});

describe('GET /leaderboard', () => {
  describe('Quando a rota é acessada com sucesso:', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves(mock.finishedMatches as Match[]);
      sinon.stub(Team, 'findAll').resolves(mock.teams as Team[]);
    });
    afterEach(() => sinon.restore());

    it('Deve retornar status 200 e a listagem de classificação', async () => {
      const { status, body } = await chai.request(app).get('/leaderboard');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mock.generalBoard);
    });
  });
});


