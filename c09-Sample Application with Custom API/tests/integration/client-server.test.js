import chai from 'chai';
import request from 'supertest';

const expect = chai.expect;

// Docker-mapped ports
const SERVER_URL = 'http://localhost:32001';
const CLIENT_URL = 'http://localhost:32000';

describe('Client ↔ Server Integration', function () {
  this.timeout(5000); // increase timeout for slow container startup

  it('Server responds to health check', async () => {
    const res = await request(SERVER_URL)
      .get('/api/v1/health') // ensure your server has a health endpoint
      .expect(200);

    expect(res.body).to.have.property('status', 'ok');
  });

  it('Client can fetch examples via server', async () => {
    const res = await request(CLIENT_URL)
      .get('/api/v1/examples') // client proxies/fetches server data
      .expect(200);

    expect(res.body).to.be.an('array');
  });

  it('Client can add new example via server', async () => {
    const newExample = { name: 'integration-test' };

    const res = await request(CLIENT_URL)
      .post('/api/v1/examples')
      .send(newExample)
      .expect(200);

    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('name', 'integration-test');
  });
});
