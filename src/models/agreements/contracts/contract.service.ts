import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractService {
  private contract: any[] = [
    {
      id: 1,
      name: 'Contract 1',
    },
    {
      id: 2,
      name: 'Contract 2',
    },
    {
      id: 3,
      name: 'Contract 3',
    },
  ];

  findAll() {
    return this.contract;
  }

  findOne(id: number) {
    return this.contract.find((contract) => contract.id === id);
  }

  create(contract: any) {
    this.contract.push(contract);
  }

  update(id: number, contract: any) {
    const index = this.contract.findIndex((contract) => contract.id === id);
    this.contract[index] = contract;
  }
}
