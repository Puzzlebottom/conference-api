import {Session} from "./Session.js";
import {expect} from 'chai'
import sinon from 'sinon';
import {sessionRepository} from "./sessionRepository.js";

const sandbox = sinon.createSandbox();

describe('Session', () => {
  beforeEach(() => {
    sandbox.stub(sessionRepository, 'countDuplicateTitles');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('.isValid()', () => {
    it('should return false when title is blank', async () => {
      sessionRepository.countDuplicateTitles.returns(0)
      const session = new Session({title: ''});
      expect(await session.isValid()).to.be.false;
    });

    it('should call countDuplicateTitles once', async () => {
      sessionRepository.countDuplicateTitles.returns(0)
      const session = new Session({title: 'foo'});
      await session.isValid();
      sandbox.assert.calledOnce(sessionRepository.countDuplicateTitles);
    });

    it('should return false when countDuplicateTitles returns value > 0', async () => {
      sessionRepository.countDuplicateTitles.returns(1)
      const session = new Session({title: 'foo'})
      expect(await session.isValid()).to.be.false
    });

    it('should return true when start time is in a valid format', async () => {
      sessionRepository.countDuplicateTitles.returns(0)
      const session = new Session({title: 'foo', startTime: '9:00 am'})
      expect(await session.isValid()).to.be.true;
    });

    it('should return false when start time is not valid', async () => {
      sessionRepository.countDuplicateTitles.returns(0)
      const session = new Session({title: 'foo', startTime: '25:00 am'})
      expect (await session.isValid()).to.be.false;
    });

    it('should return false when start time is not in a valid format', async () => {
      sessionRepository.countDuplicateTitles.returns(0)
      const session = new Session({title: 'foo', startTime: 'nine am'})
      expect (await session.isValid()).to.be.false;
    });
  })
})

