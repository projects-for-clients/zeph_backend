import { Test } from '@nestjs/testing';
import { AppService } from '../app.service';
import { CACHE_MANAGER } from '@nestjs/common';

describe('AppService', () => {
  let appService: AppService;

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        AppService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
  });

  // describe('getHello', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appService.getHello()).toBe('Hello World!');
  //   });
  // });

  describe('It should be defined', () => {
    expect(appService).toBeDefined();
  });

  //   describe('set', () => {
  //     it('should return "Cache set"', async () => {
  //       jest.spyOn(cacheManager, 'set').mockImplementation(async () => {});
  //       expect(await appService.set()).toBe('Cache set');
  //     });
  //   });

  //   describe('get', () => {
  //     it('should return "value"', async () => {
  //       jest.spyOn(cacheManager, 'get').mockImplementation(async () => 'value');
  //       expect(await appService.get()).toBe('value');
  //     });
  //   });
});
