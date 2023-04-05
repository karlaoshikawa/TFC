import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UsersModel from '../database/models/UsersModel';

import { Model } from 'sequelize';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endopoint /login: Testando a camada Service', () => {
  let chaiHttpResponse: Response;
  
  it('Testando user valido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "admin@admin.com",
        "password": "secret_admin"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

    it('Testando password invalido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "admin@admin.com",
        "password": "secret_adm"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
    });
  
  it('Testando email invalido', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "email": "admin@admin",
        "password": "secret_adm"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(401);
  });
  
    it('Testando email existe', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        "password": "secret_adm"
      });

    expect(chaiHttpResponse.status).to.be.deep.equal(400);
    });
  
    it('Testando tokem invalido', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/role');
      expect(chaiHttpResponse.status).to.be.deep.equal(401);
    });
  
});