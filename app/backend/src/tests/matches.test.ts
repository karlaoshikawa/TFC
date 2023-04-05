import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchesModel from '../database/models/MatchesModel';

import { matchesMock } from './mock/matchesMock';

import { Model } from 'sequelize';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endopoint /matches', () => {
  let chaiHttpResponse: Response;
  afterEach(() => { sinon.restore() })
  
  it('Verifica se retorna a lista de todos os matches', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Verifica rota matches inProgress === true', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

    it('Verifica rota matches inProgress === false', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
    });
  
    it('Verifica rota matches/:id/finish', async () => {
      chaiHttpResponse = await (await chai.request(app).patch('/matches/12/finish').set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2ODAxMTcxNDQsImV4cCI6MTY4MDcyMTk0NH0.W7HtwlyZAt_ikfXglOCaWRh5hcjAkhoK6Wbu3EnnlEA'
    ));

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
    });
  
    it('Verifica rota matches/:id', async () => {
    chaiHttpResponse = await chai
       .request(app).patch('/matches/12').set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2ODAxMTcxNDQsImV4cCI6MTY4MDcyMTk0NH0.W7HtwlyZAt_ikfXglOCaWRh5hcjAkhoK6Wbu3EnnlEA'
    ).send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        });

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });
});