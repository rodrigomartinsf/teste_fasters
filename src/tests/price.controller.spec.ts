import { Test, TestingModule } from '@nestjs/testing';
import { PricesController } from '../controllers/prices.controller';
import { PricesService } from '../services/prices.service';
import { Sequelize } from 'sequelize-typescript';
import { Price } from '../models/price.model';

describe('PricesController', () => {
  let pricesController: PricesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PricesController],
      providers: [PricesService],
    }).compile();

    pricesController = app.get<PricesController>(PricesController);
  });

  describe('/prices/MGLU3/2011', () => {
    it('Deve retornar status 200"', async () => {
      
    });
  });
});
