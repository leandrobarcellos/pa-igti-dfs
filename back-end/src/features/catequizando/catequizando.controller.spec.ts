import { Test, TestingModule } from '@nestjs/testing';
import { CatequizandoController } from './catequizando.controller';

describe('CatequizandoController', () => {
  let controller: CatequizandoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatequizandoController],
    }).compile();

    controller = module.get<CatequizandoController>(CatequizandoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
