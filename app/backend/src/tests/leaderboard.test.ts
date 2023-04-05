import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchesModel from '../database/models/MatchesModel';

import { Model } from 'sequelize';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endopoint /learderboard', () => {
  let chaiHttpResponse: Response;
  afterEach(() => { sinon.restore() })
  
  it('Verifica se retorna a lista /leaderboard/home', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Verifica se retorna a lista /leaderboard/away', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

    it('Verifica se retorna a lista /leaderboard', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
    });
});