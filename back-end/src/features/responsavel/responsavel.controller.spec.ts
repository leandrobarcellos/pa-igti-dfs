import { Test, TestingModule } from '@nestjs/testing';
import { ResponsavelController } from './responsavel.controller';

describe('ResponsavelController', () => {
  let controller: ResponsavelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsavelController],
    }).compile();

    controller = module.get<ResponsavelController>(ResponsavelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
