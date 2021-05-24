import {expect} from 'chai'
import request from "supertest";
import {app} from "./app.js";
import {talkRepository} from "./talkRepository.js";

describe('app', () => {
  describe('POST /api/talks', () => {

    it('should save a talk', async () => {
      const currentNumberOfTalks = (await talkRepository.findAllBySessionId(1)).length;
      await request(app)
        .post('/api/talks')
        .set('Accept', 'application/json')
        .send({title: 'john', duration: '5', sessionId: '1'})
        .expect(200);
      const newCount = (await talkRepository.findAllBySessionId(1)).length;
      expect(newCount - currentNumberOfTalks).to.eql(1);
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