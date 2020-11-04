import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ErrorFilter} from "./core/filters/error.filter";
import {ResponseInterceptor} from "./core/filters/response.interceptor";

async function bootstrap() {
  const portNumber = 3333;
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors({
    credentials: true,
    preflightContinue: true
  });
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(portNumber);
  console.log(`e-Catequese executando na porta ${portNumber}`);
}
bootstrap();
