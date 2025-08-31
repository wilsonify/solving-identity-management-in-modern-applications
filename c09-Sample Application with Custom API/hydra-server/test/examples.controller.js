import chai from 'chai';
import request from 'supertest';
import Server from '../server/common/Server';

const expect = chai.expect;

// Minimal in-memory data store for testing
let examples = [
  { id: 1, name: 'example1' },
  { id: 2, name: 'example2' },
];

// Create an Express app without starting HTTP server
const app = new Server().router(app => {
  // List all examples
  app.get('/api/v1/examples', (req, res) => res.json(examples));

  // Add a new example
  app.post('/api/v1/examples', (req, res) => {
    const newExample = { id: examples.length + 1, ...req.body };
    examples.push(newExample);
    res.json(newExample);
  });

  // Get example by ID
  app.get('/api/v1/examples/:id', (req, res) => {
    const ex = examples.find(e => e.id === parseInt(req.params.id, 10));
    if (!ex) return res.status(404).json({ error: 'Not found' });
    res.json(ex);
  });
}).listen(undefined, false); // pass false to avoid starting the HTTP server

describe('Examples', () => {
  it('should get all examples', async () => {
    const res = await request(app)
      .get('/api/v1/examples')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body)
      .to.be.an('array')
      .with.lengthOf(2);
  });

  it('should add a new example', async () => {
    const res = await request(app)
      .post('/api/v1/examples')
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body)
      .to.be.an('object')
      .that.has.property('name', 'test');
  });

  it('should get an example by id', async () => {
    const res = await request(app)
      .get('/api/v1/examples/2')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body)
      .to.be.an('object')
      .that.has.property('name', 'example2');
  });
});
