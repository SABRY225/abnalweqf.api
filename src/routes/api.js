import express from 'express';
import {
  User,
  Service,
  Station,
  Vehicle,
  Journey,
  Advertisement,
  RequestAdvertisement,
  TukTukTrip,
} from '../models/index.js';

const router = express.Router();

const createCrud = (model) => {
  const route = express.Router();

  route.get('/', async (req, res) => {
    const items = await model.findAll();
    res.json(items);
  });

  route.get('/:id', async (req, res) => {
    const item = await model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  });

  route.post('/', async (req, res) => {
    const item = await model.create(req.body);
    res.status(201).json(item);
  });

  route.put('/:id', async (req, res) => {
    const item = await model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update(req.body);
    res.json(item);
  });

  route.delete('/:id', async (req, res) => {
    const item = await model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.destroy();
    res.json({ message: 'Deleted successfully' });
  });

  return route;
};

router.use('/users', createCrud(User));
router.use('/services', createCrud(Service));
router.use('/stations', createCrud(Station));
router.use('/vehicles', createCrud(Vehicle));
router.use('/journeys', createCrud(Journey));
router.use('/advertisements', createCrud(Advertisement));
router.use('/advert-requests', createCrud(RequestAdvertisement));
router.use('/trips', createCrud(TukTukTrip));

export default router;
