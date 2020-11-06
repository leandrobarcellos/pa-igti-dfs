import { Test, TestingModule } from '@nestjs/testing';
import { EncontroCatequeseController } from './encontro-catequese.controller';

describe('EncontroCatequeseController', () => {
  let controller: EncontroCatequeseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncontroCatequeseController],
    }).compile();

    controller = module.get<EncontroCatequeseController>(EncontroCatequeseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
