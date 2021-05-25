import {expect} from 'chai'
import request from "supertest";
import {app} from "./app.js";
import {talkRepository} from "./talkRepository.js";
import {database} from "./database.js"

const expectAction = (action) => ({
  changesCountOf: async (valueAccessor, by) => {
    const initialValue = await valueAccessor();
    await action();
    const endingValue = await valueAccessor();
    expect(endingValue - initialValue).to.eql(by);
  }
});

const talkCount = async () => (await talkRepository.findAllBySessionId(1)).length;

describe('app integration', () => {
  beforeEach(async () => {
    await database.migrate.latest();
  });

  describe('POST /api/talks', () => {
    it('should save a talk', async () => {
      const saveTalk = () => request(app)
        .post('/api/talks')
        .set('Accept', 'application/json')
        .send({title: 'john', duration: '5', sessionId: '1'})
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
});