import { Module } from '@nestjs/common';
import { LeaseAgreementsService } from './lease_agreements.service';
import { LeaseAgreementsController } from './lease_agreements.controller';

@Module({
  controllers: [LeaseAgreementsController],
  providers: [LeaseAgreementsService]
})
export class LeaseAgreementsModule {}
