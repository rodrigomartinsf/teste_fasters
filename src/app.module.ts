import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { PricesController } from './controllers/prices.controller';
import { PricesService } from './services/prices.service';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module'
import { Price } from './models/price.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'fasters',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Price])
  ],
  controllers: [PricesController],
  providers: [PricesService],
})
export class AppModule {}
