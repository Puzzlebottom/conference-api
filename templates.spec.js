import {sessionRepository} from "./sessionRepository.js";
import {expect} from 'chai';
import sinon from 'sinon';
import {renderPage} from "./templates.js"

const sandbox = sinon.createSandbox();

describe('templates', () => {
  beforeEach(() => {
    sandbox.stub(sessionRepository, 'findAll');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('renderPage()', () => {
    it('produces an html template', async () => {
      sessionRepository.findAll.returns([]);

      const output = await renderPage();

      expect(output).to.contain('<html lang="en">');
    });
  });
});
