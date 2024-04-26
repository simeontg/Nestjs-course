import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly resevationsService: ReservationsService) {}

  @Post()
  create(@Body() createResevationDto: CreateReservationDto) {
    return this.resevationsService.create(createResevationDto);
  }

  @Get()
  findAll() {
    return this.resevationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resevationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResevationDto: UpdateReservationDto) {
    return this.resevationsService.update(+id, updateResevationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resevationsService.remove(+id);
  }
}
