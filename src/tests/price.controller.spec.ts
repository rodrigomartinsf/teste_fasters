import { PricesController } from './../controllers/prices.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PricesService } from './../services/prices.service';

describe('AppController', () => {
  let pricesController: PricesController;
  let pricesService: PricesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PricesController],
      providers: [PricesService, { provide: PricesService, useValue: jest.fn() }],
    }).compile();

    pricesController = app.get<PricesController>(PricesController);
  });

  describe('prices', () => {
    it('Deve retornar um array"', async () => {
      const filtro: Object = {
        ticker: "MGLU3",
        ano: "2011"
      };
      const res = await pricesController.findAll(filtro);
      expect(res).toHaveBeenCalled();
    });
  });
});
