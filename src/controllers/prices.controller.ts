import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { PricesService } from "../services/prices.service";
import { Price } from '../models/price.model';

@Controller('prices')
export class PricesController {

  constructor(private cotacaoService: PricesService){

  }

  @Get(':ticker/:ano')
  async findAll(@Param() param): Promise<{}> {
    const { ticker, ano } = param;
    try {
      const response = await this.cotacaoService.findByFilter(ticker, ano);
      if(Object.keys(response).length > 0){
        return response;
      } else {
        const response = await this.cotacaoService.consolidaCotacoes(ticker, ano)
        return response;
      }
      
    } catch (error) {
      
    }
    
  }
  
}