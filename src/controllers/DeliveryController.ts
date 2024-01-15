import { IDeliveryController } from "../interfaces/IDeliveryController";
import { DeliveryPayload, IDeliveryRepository } from "../interfaces/IDeliveryRepository";
import { Request, Response } from 'express'
import { DeliveryRepository } from "../repositories/DeliveryRepository";

export class DeliveryController implements IDeliveryController {
  constructor(private deliveryRepository: IDeliveryRepository) { }

  async getById(req: Request, res: Response) {
    try {
      const deliveryId = Number(req.params.id)

      const delivery = await this.deliveryRepository.getById(deliveryId);

      if (!delivery) {
        return res.status(400).json({ error: 'Error while getting delivery' })
      }

      return res.status(200).json(delivery)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async getUserDeliveries(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id)

      const userDeliveries = await this.deliveryRepository.getUserDeliveries(userId);

      if (!userDeliveries) {
        return res.status(400).json({ error: 'Error while getting user deliveries' })
      }

      return res.status(200).json(userDeliveries)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const delivery: DeliveryPayload = req.body;

      const deliveryUpdated = await this.deliveryRepository.update(delivery, id)

      if (!deliveryUpdated) {
        return res.json(400).json({ error: "Error while trying to update delivery" })
      }

      return res.status(200).json(deliveryUpdated)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const delivery = await this.deliveryRepository.remove(id)

      if (!delivery) {
        return res.json(400).json({ error: "Error while trying to remove delivery" })
      }

      return res.status(200).json(delivery)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const delivery: DeliveryPayload = req.body;

      const deliveryCreated = await this.deliveryRepository.create(delivery)

      if (!deliveryCreated) {
        return res.json(400).json({ error: "Error while trying to create delivery" })
      }

      return res.status(200).json(deliveryCreated)
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default new DeliveryController(new DeliveryRepository());