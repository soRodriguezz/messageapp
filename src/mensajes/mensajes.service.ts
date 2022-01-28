import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './entities/mensaje.entity';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Mensaje)
    private readonly mensajeRepository: Repository<Mensaje>,
  ) {}

  async getAll(): Promise<Mensaje[]> {
    return this.mensajeRepository.find();
  }

  async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> {
    const mensaje = new Mensaje();
    mensaje.nick = mensajeNuevo.nick;
    mensaje.mensaje = mensajeNuevo.mensaje;
    return this.mensajeRepository.save(mensaje);
  }

  async updateMensaje(
    id: number,
    mensajeActualizado: CreateMensajeDto,
  ): Promise<Mensaje> {
    const mensaje = await this.mensajeRepository.findOne(id);
    mensaje.nick = mensajeActualizado.nick;
    mensaje.mensaje = mensajeActualizado.mensaje;
    return this.mensajeRepository.save(mensaje);
  }

  async deleteMensaje(id: number): Promise<any> {
    return this.mensajeRepository.delete(id);
  }
}
