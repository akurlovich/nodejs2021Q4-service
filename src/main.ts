import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { getConnection } from 'typeorm';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { User } from './entity/User';

import { AppModule } from './app.module';
import { PORT, USE_FASTIFY } from './common/config';

async function bootstrap(useFasify: string | undefined) {
  if (useFasify === 'fastify') {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );

    process.on('unhandledRejection', (reason, promise) => {
      console.error(`unhandledRejection, reason: ${reason} ${promise}`);
    });

    process.on('uncaughtExceptionMonitor', (err: Error, origin: string) => {
      console.error(`uncaughtException, reason: ${err} ${origin}`);
    });

    await app.listen(Number(PORT), '0.0.0.0');

    const options = new DocumentBuilder()
      .setTitle('Trello')
      .setDescription('Nestjs trello')
      .setVersion('1.0.0')
      .addTag('trello')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('doc', app, document);

    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.login = :login', { login: 'admin' })
      .getOne();

    if (!user) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([{ name: 'admin', login: 'admin', password: 'admin' }])
        .execute();
    }
    
    console.log(`App listen on port ${PORT} fastify`);
  } else {
    const app = await NestFactory.create(AppModule);

    process.on('unhandledRejection', (reason, promise) => {
      console.error(`unhandledRejection, reason: ${reason} ${promise}`);
    });

    process.on('uncaughtExceptionMonitor', (err: Error, origin: string) => {
      console.error(`uncaughtException, reason: ${err} ${origin}`);
    });

    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.login = :login', { login: 'admin' })
      .getOne();

    if (!user) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([{ name: 'admin', login: 'admin', password: 'admin' }])
        .execute();
    }

    const options = new DocumentBuilder()
      .setTitle('Trello')
      .setDescription('Nestjs trello')
      .setVersion('1.0.0')
      .addTag('trello')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('doc', app, document);

    await app.listen(PORT || 3000);

    // Promise.reject(Error('Oops'));
    // throw new Error('Ooops');
    console.log(`App listen on port ${PORT} express`);
  }
}
bootstrap(USE_FASTIFY);
