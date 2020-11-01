import { Test, TestingModule } from '@nestjs/testing';
import { CatequistaService } from './catequista.service';

describe('CatequistaService', () => {
  let service: CatequistaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatequistaService],
    }).compile();

    service = module.get<CatequistaService>(CatequistaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
