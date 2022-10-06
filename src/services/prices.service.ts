import { Price } from "../models/price.model";
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';

@Injectable()
export class PricesService {
  constructor(@InjectModel(Price) private priceModel: typeof Price){

  }

  async findByFilter(ticker: string, ano: string): Promise<{}> {
    try {
      const response = await this.priceModel.findAll({
        where: {
          ticker: ticker,
          year: ano
        }
      });
      const newObj = {};
      Object.keys(response).forEach(async (element) => {
        newObj: {
          newObj[response[element].month] = {
            open_price: Number(response[element].open_price),
            highest_price: Number(response[element].highest_price),
            lowest_price: Number(response[element].lowest_price),
            volume: Number(response[element].volume),
            close_price: Number(response[element].close_price),
          }
        }
        
      });

      return newObj;
    } catch (error) {
      console.log(error.message);
    }
  }

  async consolidaCotacoes(ticker: string, ano: string): Promise<{}> {
    const csvFile = readFileSync(__dirname+`../../../data/Stocks/${ticker}.SA.csv`);
    const csvData = csvFile.toString()
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results,
    });
    let parsedObj = parsedCsv.data;
    for(const element of parsedObj) {
      element.Year = new Date(element.date).getFullYear();
      element.MonthDesc = new Date(element.date.substr(5,2)).toLocaleString('en-US', { month: 'short' });
      element.Month = element.date.substr(5,2);
      element.Ticker = ticker;
    }

    const filteredArray = parsedObj.filter((obj) => {
      return obj.Ticker == ticker && obj.Year == ano 
      }
    )

    const groupedArray = PricesService.agruparPorPeriodo(filteredArray);
    let newObj = {};
    Object.keys(groupedArray).forEach(async (periodo) => {
      newObj: {
        newObj[periodo] = {
          open_price: Number(groupedArray[periodo][0].open),
          highest_price: Math.max(...groupedArray[periodo].map(obj => obj.high)),
          lowest_price: Math.min(...groupedArray[periodo].map(obj => obj.low)),
          volume: groupedArray[periodo].reduce( (volume, row) => {
                  return Number(volume) + Number(row.volume)
                }, 0),
          close_price: Number(groupedArray[periodo][groupedArray[periodo].length - 1].close)
        }  
      }
      const objToSave = {
        ticker: ticker,
        year: ano,
        month: periodo,
        open_price: Number(groupedArray[periodo][0].open),
        highest_price: Math.max(...groupedArray[periodo].map(obj => obj.high)),
          lowest_price: Math.min(...groupedArray[periodo].map(obj => obj.low)),
          volume: groupedArray[periodo].reduce( (volume, row) => {
                  return Number(volume) + Number(row.volume)
                }, 0),
          close_price: Number(groupedArray[periodo][groupedArray[periodo].length - 1].close)
      }
      await this.priceModel.bulkCreate([objToSave]);
    });
    
    return newObj;
  }

  static agruparPorPeriodo(data) {
    const groupByMonth = data.reduce((group, row) => {
      const { MonthDesc } = row
      group[MonthDesc] = group[MonthDesc] ?? []
      group[MonthDesc].push(row)
      return group
    }, {})
    return groupByMonth
  }

}

