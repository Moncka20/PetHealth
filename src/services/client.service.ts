import { Injectable } from '@nestjs/common';
import { CreateClientDto } from '../dtos/client/create-client.dto.js';
import { UpdateClientDto } from '../dtos/client/update-client.dto.js';

@Injectable()
export class ClientService {
  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, UpdateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}