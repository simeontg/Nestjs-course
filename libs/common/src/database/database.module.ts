import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow('DB_HOST'),
                port: configService.getOrThrow('DB_PORT'),
                username: configService.getOrThrow('DB_USERNAME'),
                password: configService.getOrThrow('DB_PASSWORD'),
                database: configService.getOrThrow('DB_NAME'),
                entities: [],
                synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
                autoLoadEntities: true
                
        }),
        inject: [ConfigService]
    }
    )]
})

export class DatabaseModule {
    static forFeature(models: EntityClassOrSchema[]) {
        return TypeOrmModule.forFeature(models);
    }
}

