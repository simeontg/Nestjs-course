import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {

  constructor(
    private readonly reservationsRepository: ReservationsRepository
  ){}

  create(createReservationDto: CreateReservationDto) {
    const reservation = new Reservation({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });

    return this.reservationsRepository.create(reservation);
  }

  findAll() {
    return this.reservationsRepository.find({});
  }

  findOne(id: number) {
    return this.reservationsRepository.findOne({ id });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate({id}, updateReservationDto)
  }

  remove(id: number) {
    return this.reservationsRepository.findOneAndDelete({ id });
  }
}
