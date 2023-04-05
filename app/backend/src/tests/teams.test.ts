import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamsModel from '../database/models/TeamModel';

import { teamsAllMock, teamsIdMock } from './mock/teamsMock';

import { Model } from 'sequelize';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endopoint /teams: Testando a camada Service', () => {
  let chaiHttpResponse: Response;
  
  before(async () => {
    sinon.stub(Model, "findAll").resolves(teamsAllMock as TeamsModel[]);
  })
  it('Verifica se retorna a lista de todos os times', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.body).to.deep.equal(teamsAllMock);
    expect(chaiHttpResponse.status).to.be.deep.equal(200);
    (Model.findAll as sinon.SinonStub).restore();
  });

  it('Verifica se retorna um time pelo ID', async () => {
    sinon.stub(Model, "findOne").resolves(teamsIdMock as  TeamsModel);

    chaiHttpResponse = await chai.request(app).get('/teams/5');

    expect(chaiHttpResponse.body).to.deep.equal(teamsIdMock);
    expect(chaiHttpResponse.status).to.be.deep.equal(200);
    (Model.findOne as sinon.SinonStub).restore();
  });
});