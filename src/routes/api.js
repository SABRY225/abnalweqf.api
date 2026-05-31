import express from 'express';
import {
  User,
  Service,
  Package,
  Station,
  Vehicle,
  Journey,
  Advertisement,
  RequestAdvertisement,
  TukTukTrip,
  Shipment,
  Event,
  Pharmacy,
  Lab,
  Clinic,
  Workshop,
  HomeServiceProblem,
  HomeServiceTechnician,
} from '../models/index.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const [
      users,
      services,
      packages,
      stations,
      vehicles,
      journeys,
      advertisements,
      advertRequests,
      trips,
      shipments,
      events,
      pharmacies,
      labs,
      clinics,
      workshops,
      homeServiceProblems,
      homeServiceTechnicians,
    ] = await Promise.all([
      User.count(),
      Service.count(),
      Package.count(),
      Station.count(),
      Vehicle.count(),
      Journey.count(),
      Advertisement.count(),
      RequestAdvertisement.count(),
      TukTukTrip.count(),
      Shipment.count(),
      Event.count(),
      Pharmacy.count(),
      Lab.count(),
      Clinic.count(),
      Workshop.count(),
      HomeServiceProblem.count(),
      HomeServiceTechnician.count(),
    ]);

    res.json({
      users,
      services,
      packages,
      stations,
      vehicles,
      journeys,
      advertisements,
      advertRequests,
      trips,
      shipments,
      events,
      pharmacies,
      labs,
      clinics,
      workshops,
      homeServiceProblems,
      homeServiceTechnicians,
    });
  } catch (error) {
    console.error('Failed to compute stats:', error);
    res.status(500).json({ error: 'Failed to compute stats' });
  }
});

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
router.use('/packages', createCrud(Package));
router.use('/stations', createCrud(Station));
router.use('/vehicles', createCrud(Vehicle));
router.use('/journeys', createCrud(Journey));
router.use('/advertisements', createCrud(Advertisement));
router.use('/advert-requests', createCrud(RequestAdvertisement));
router.use('/trips', createCrud(TukTukTrip));
router.use('/shipments', createCrud(Shipment));
router.use('/events', createCrud(Event));
router.use('/pharmacies', createCrud(Pharmacy));
router.use('/labs', createCrud(Lab));
router.use('/clinics', createCrud(Clinic));
router.use('/workshops', createCrud(Workshop));
router.use('/home-service-problems', createCrud(HomeServiceProblem));
router.use('/home-service-technicians', createCrud(HomeServiceTechnician));

export default router;
