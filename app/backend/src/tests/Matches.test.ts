import * as chai from 'chai';
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import * as mock from './mocks-stubs/matches-mock';

import { Model } from 'sequelize';
import { app } from '../app';
import { IMatches } from '../Interfaces/Matches/IMatch';

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
