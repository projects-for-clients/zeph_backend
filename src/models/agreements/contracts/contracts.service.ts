import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractsService {
  private contracts: any[] = [
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
    return this.contracts;
  }

  findOne(id: number) {
    return this.contracts.find((contract) => contract.id === id);
  }

  create(contract: any) {
    this.contracts.push(contract);
  }

  update(id: number, contract: any) {
    const index = this.contracts.findIndex((contract) => contract.id === id);
    this.contracts[index] = contract;
  }
}
