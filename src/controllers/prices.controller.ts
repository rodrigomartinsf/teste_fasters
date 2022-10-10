import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { PricesService } from "../services/prices.service";

@Controller('prices')
export class PricesController {

  constructor(public priceService: PricesService){

  }

  @Get(':ticker/:ano')
  async findAll(@Param() param): Promise<Object> {
    const { ticker, ano } = param;
    try {
      const response = await this.priceService.findByFilter(ticker, ano);
      if(Object.keys(response).length > 0){
        return response;
      } else {
        const response = await this.priceService.consolidaCotacoes(ticker, ano)
        return response;
      }
      
    } catch (error) {
      return {error};
    }
    
  }
  
}