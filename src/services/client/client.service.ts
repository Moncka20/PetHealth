import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from '../../dtos/client/create-client.dto.js';
import { UpdateClientDto } from '../../dtos/client/update-client.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../entities/client/client.entity.js';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly repo: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = this.repo.create(createClientDto);
    return await this.repo.save(client);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const client = await this.repo.findOneBy({ id });

    if (!client) {
      throw new NotFoundException(`Client con id ${id} no encontrado`);
    }

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.repo.preload({
      id,
      ...updateClientDto,
    });

    if (!client) {
      throw new NotFoundException(`Client con id ${id} no encontrado`);
    }

    return await this.repo.save(client);
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    return await this.repo.remove(client);
  }
}