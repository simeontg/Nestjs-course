import { Test, TestingModule } from '@nestjs/testing';
import { ResevationsService } from './reservations.service';

describe('ResevationsService', () => {
  let service: ResevationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResevationsService],
    }).compile();

    service = module.get<ResevationsService>(ResevationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
