import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './User.entity';


@Injectable()
export class AppService {

  constructor(
    @Inject('CRIS_SERVICE')private readonly clientCris:ClientProxy,
    @InjectRepository(User)private readonly userRepository: Repository<User>,
    ) {}

  async newUser (body: {name: string; email: string; }) {

    const newUser = this.userRepository.create(body);
    const savedUser = await this.userRepository.save(newUser);

  
    this.clientCris.emit('new_cris', savedUser );
    return savedUser;
  }

}
