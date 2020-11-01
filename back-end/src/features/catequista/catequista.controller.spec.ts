import { Test, TestingModule } from '@nestjs/testing';
import { CatequistaController } from './catequista.controller';

describe('CatequistaController', () => {
  let controller: CatequistaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatequistaController],
    }).compile();

    controller = module.get<CatequistaController>(CatequistaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
