import {expect} from 'chai'
import request from 'supertest';
import {app} from "./app.js";
import {talkRepository} from "./talkRepository.js";
import {database} from "./database.js"
import {sessionRepository} from "./sessionRepository.js";

const expectAction = (action) => ({
  changesCountOf: async (valueAccessor, by) => {
    const initialValue = await valueAccessor();
    await action();
    const endingValue = await valueAccessor();
    expect(endingValue - initialValue).to.eql(by);
  }
});
const testSession = {title: 'Test Session', startTime: '9:00 am'};
const testTalk = {title: 'Test Talk', duration: 60, sessionId: 1}
const talkCount = async () => (await talkRepository.findAllBySessionId(1)).length;
const sessionCount = async () => (await sessionRepository.findAll()).length;

describe('app integration', () => {
  beforeEach(async () => {
    await database.migrate.latest();
    await sessionRepository.clearTable();
    await sessionRepository.save(testSession);
    await talkRepository.clearTable();
    await talkRepository.save(testTalk);
  });

  describe('POST /api/talks', () => {
    it('should save a valid talk', async () => {
      const saveTalk = () => request(app)
        .post('/api/talks')
        .set('Accept', 'application/json')
        .send({title: 'test', duration: 5, sessionId: 1})
        .expect(200);

      await expectAction(saveTalk).changesCountOf(talkCount, 1);
    });

    it('should not save an invalid talk', async () => {
      return request(app)
        .post('/api/talks')
        .set('Accept', 'application/json')
        .send({title: 'john', duration: 'foo', sessionId: '1'})
        .expect(400);
    });
  });

  describe('POST /api/sessions', () => {
    it ('should save a valid session', async () => {
      const saveSession = () => request(app)
        .post('/api/sessions')
        .set('Accept', 'application/json')
        .send({title: 'test', startTime: '9:00 am'})
        .expect(200);

      await expectAction(saveSession).changesCountOf(sessionCount, 1);
    });

    it('should not save an invalid session', async () => {
      return request(app)
        .post('/api/sessions')
        .set('Accept', 'application/json')
        .send({title: 'foo', startTime: 'Never!'})
        .expect(400);
    });
  })

  describe ('GET /api/talks',() => {
    xit('should return a talk with an id, title, duration and sessionId', () => {

    })

    //same for sessions
    //
  })
});