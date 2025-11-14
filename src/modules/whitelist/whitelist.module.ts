import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWhitelist } from './entities/user-whitelist.entity';
import { WhitelistService } from './whitelist.service';
import { WhitelistController } from './whitelist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserWhitelist])],
  providers: [WhitelistService],
  controllers: [WhitelistController],
  exports: [WhitelistService],
})
export class WhitelistModule {}
