import { Test, TestingModule } from '@nestjs/testing';
import { FrequenciaCatequizandoController } from './frequencia-catequizando.controller';

describe('FrequenciaCatequizandoController', () => {
  let controller: FrequenciaCatequizandoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrequenciaCatequizandoController],
    }).compile();

    controller = module.get<FrequenciaCatequizandoController>(FrequenciaCatequizandoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
