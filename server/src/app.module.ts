import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-ioredis-yet";
import { UserModule } from "./user/user.module";
import { CondoUnitModule } from "./condoUnit/condoUnit.module";
import { PropertyModule } from "./property/property.module";
import { ParkingSpotModule } from "./parkingSpot/parkingSpot.module";
import { LockerModule } from "./locker/locker.module";
import { CompanyModule } from "./company/company.module";
import { FileModule } from "./file/file.module";
import { RegistrationKeyModule } from "./registrationKey/registrationKey.module";
import { RoleModule } from "./role/role.module";
import { CompanyEmployeeModule } from "./companyEmployee/companyEmployee.module";
import { UserCondoModule } from "./userCondo/userCondo.module";
import { ForumModule } from "./forum/forum.module";
import { PostModule } from "./post/post.module";
import { CommonFacilityModule } from "./commonFacility/commonFacility.module";
import { ReservationModule } from "./reservation/reservation.module";
import { RequestModule } from "./request/request.module";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SecretsManagerModule } from "./providers/secrets/secretsManager.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { CondoCostModule } from './condo-cost/condo-cost.module';
import { CostModule } from './cost/cost.module';

@Module({
  controllers: [],
  imports: [
    ACLModule,
    AuthModule,
    UserModule,
    CondoUnitModule,
    PropertyModule,
    ParkingSpotModule,
    LockerModule,
    CompanyModule,
    FileModule,
    RegistrationKeyModule,
    RoleModule,
    CompanyEmployeeModule,
    UserCondoModule,
    ForumModule,
    PostModule,
    CommonFacilityModule,
    ReservationModule,
    RequestModule,
    HealthModule,
    PrismaModule,
    SecretsManagerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: "schema.graphql",
          sortSchema: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
/*    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => {
        const host = configService.get("REDIS_HOST");
        const port = configService.get("REDIS_PORT");
        const username = configService.get("REDIS_USERNAME");
        const password = configService.get("REDIS_PASSWORD");
        const ttl = configService.get("REDIS_TTL", 5000);

        return {
          store: await redisStore({
            host: host,
            port: port,
            username: username,
            password: password,
            ttl: ttl,
          }),
        };
      },

      inject: [ConfigService],
    }),*/
    CondoCostModule,
    CostModule,
  ],
  providers: [],
})
export class AppModule {}
