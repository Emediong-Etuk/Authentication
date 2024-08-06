import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory:(configService:ConfigService)=>({
        type: "mysql",
        host: configService.get('HOST'),
        port:Number(configService.get('PORT')),
        username:'root',
        password: configService.get('PASSWORD'),
        database: 'authentication',
        // entities: [User],
        autoLoadEntities:true,
        synchronize:true,
      }),
      inject:[ConfigService]
    }),
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    AuthModule,
  ],
  providers:[ConfigService]
  
})
export class AppModule {}
