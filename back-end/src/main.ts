import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const portNumber = 3333;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(portNumber);
  console.log(`e-Catequese executando na porta ${portNumber}`);
}
bootstrap();
