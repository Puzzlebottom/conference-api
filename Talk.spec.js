import {Talk} from "./Talk.js";
import {expect} from 'chai'

describe('Talk', () => {

  describe('.isValid()', () => {
    it('should return false when duration is not a number ', () => {
      const talk = new Talk({duration: 'foo'});
      expect(talk.isValid()).to.be.false;
    });

    it('should return true what duration is a number', () => {
      const talk = new Talk({duration: 1});
      expect(talk.isValid()).to.be.true;
    });

    it('should return true what duration is a string representation of a number', () => {
      const talk = new Talk({duration: '1'});
      expect(talk.isValid()).to.be.true;
    });

    it('should return false when duration is < one', () => {
      const talk = new Talk({duration: 0});
      expect(talk.isValid()).to.be.false;
    });
  })
})