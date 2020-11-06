import { Test, TestingModule } from '@nestjs/testing';
import { TurmaCatequizandoController } from './turma-catequizando.controller';

describe('TurmaCatequizandoController', () => {
  let controller: TurmaCatequizandoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurmaCatequizandoController],
    }).compile();

    controller = module.get<TurmaCatequizandoController>(TurmaCatequizandoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
