import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import chaiHttp from 'chai-http';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('Quando o campo "email" é enviado incorretamente: ', () => {
    let httpResponse: Response;
    it('Deve retornar status 400', async () => {
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
});
