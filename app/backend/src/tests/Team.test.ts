import * as chai from 'chai';
import * as sinon from 'sinon';
// import * as jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { app } from '../app';
import { Model } from 'sequelize';
import * as mock from './mocks-stubs/teams-mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  describe('Testa se é possivel acessa a rota corretamente.', () => {
    beforeEach(() =>
      sinon.stub(Model, 'findAll').resolves(mock.teams as Team[])
    );
    afterEach(() => sinon.restore());

    it('Deve retornar status 200 e a lista de times', async () => {
      const { status, body } = await chai.request(app).get('/teams');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mock.teams);
    });
  });
});

describe('GET /teams/:id', () => {
  describe('Quando a rota é acessada com id inválido', () => {
    beforeEach(() => sinon.stub(Model, 'findByPk').resolves(null));
    afterEach(() => sinon.restore());

    it('Deve retornar status 404 e a mensagem adequada', async () => {
      const { status, body } = await chai.request(app).get('/teams/:id');
      expect(status).to.equal(404);
      expect(body).to.deep.equal({
        message: 'There is no team with such id!',
      });
    });
  });

  describe('Quando a rota é acessada com um id válido:', () => {
    beforeEach(() => sinon.stub(Model, 'findByPk').resolves(mock.teamId1 as Team));
    afterEach(() => sinon.restore());
    it('Deve retornar status 200 e os dados do time acessado', async () => {
      const { status, body } = await chai.request(app).get('/teams/1');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mock.teamId1);
    });
  });
});
