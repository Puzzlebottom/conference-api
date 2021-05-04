import supertest from "supertest"
import cheerio from "cheerio"
import {expect} from "chai"
import {app} from "./server.js"

const request = supertest(app);

const getIndexHtml = async () => {
  const page = (await request.get('/')).text;
  return cheerio.load(page);
}

const post = async (uri, params) => {
  const result = await request.post(uri)
    .type('application/x-www-form-urlencoded')
    .send(params);

  expect(result.status).to.eq(302);
}

const createSession = async (title, startTime) => post('/sessions', {title, startTime});
const createTalk = async (title, duration, sessionId) => post('/talks', {title, duration, sessionId});

const getSessionIdFromIndex = async (dropdownIndex) => {
  const page = await getIndexHtml();
  return page('select option')[dropdownIndex].attribs.value;
};

describe('conference-api', () => {
  it('schedules two talks in the second of two sessions', async () => {
    await createSession('Some session title', '9:00');
    await createSession('Another session title', '9:00');
    const sessionId = await getSessionIdFromIndex(1);

    await createTalk('Some talk', 9, sessionId);
    await createTalk('Another talk', 101, sessionId);

    const page = await getIndexHtml();

    expect(page('section').length).to.eq(2);

    expect(page('section:first-of-type h2').text()).to.eq('Some session title');
    expect(page('section:last-of-type h2').text()).to.eq('Another session title');

    expect(page('section:last-of-type li').length).to.eq(2);

    expect(page('section:last-of-type li:nth-child(1)').text()).to.eq('09:00 amSome talk 9m');
    expect(page('section:last-of-type li:nth-child(2)').text()).to.eq('09:09 amAnother talk 101m');
    expect(page('section:last-of-type h3').text()).to.eq('Duration: 1 h 50 min');

  });
});