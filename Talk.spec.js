import {Talk} from "./Talk.js";
import {expect} from 'chai'
import sinon from 'sinon';
import {talkRepository} from "./talkRepository.js";

const sandbox = sinon.createSandbox();

describe('Talk', () => {
  beforeEach(() => {
    sandbox.stub(talkRepository, 'countWhereSessionIdAndTitle');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('.isValid()', () => {
    it('should return false when title is blank', async () => {
      talkRepository.countWhereSessionIdAndTitle.returns(0)
      const talk = new Talk({title: '', duration: 1, sessionId: 1});
      expect(await talk.isValid()).to.be.false
    });

    it('should return false when duration is not a number', async () => {
      talkRepository.countWhereSessionIdAndTitle.returns(0)
      const talk = new Talk({titles: 'test', duration: 'foo', sessionId: 1});
      expect(await talk.isValid()).to.be.false;
    });

    it('should return true when duration is a number', async () => {
      talkRepository.countWhereSessionIdAndTitle.returns(0)
      const talk = new Talk({title: 'test', duration: 1, sessionId: 1});
      expect(await talk.isValid()).to.be.true;
    });

    it('should return true what duration is a string representation of a number', async () => {
      talkRepository.countWhereSessionIdAndTitle.returns(0)
      const talk = new Talk({titles: 'test', duration: '1', sessionId: 1});
      expect(await talk.isValid()).to.be.true;
    });

    it('should return false when duration is < one', async () => {
      talkRepository.countWhereSessionIdAndTitle.returns(0)
      const talk = new Talk({titles: 'test', duration: 0, sessionId: 1});
      expect(await talk.isValid()).to.be.false;
    });

    it('should call countWhereSessionIdAndTitle once', async () => {
      talkRepository.countWhereSessionIdAndTitle.returns(0)
      const talk = new Talk({titles: 'test', duration: 1, sessionId: 1});
      await talk.isValid();
      sandbox.assert.calledOnce(talkRepository.countWhereSessionIdAndTitle);
    });

    it('should return false when countWhereSessionIdAndTitle returns value > 0', async () => {
      talkRepository.countWhereSessionIdAndTitle.returns(1)
      const talk = new Talk({titles: 'test', duration: 1, sessionId: 1});
      expect(await talk.isValid()).to.be.false;
    });
  })
})