import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from '../../entities/client/client.entity';
import { ClientService } from '../../services/client/client.service';
import { ClientController } from '../../controllers/client/client.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]) // 🔥 ESTO ES LO QUE FALTA
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}