import { Module } from '@nestjs/common';
import { ClientService } from '../../services/client/client.service';
import { ClientController } from '../../controllers/client/client.controller';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}