import { Test } from '@nestjs/testing';
import { AppService } from '../app.service';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

describe('AppService', () => {
  let appService: AppService;
  let cacheManager: Cache;

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
    cacheManager = moduleRef.get<Cache>(CACHE_MANAGER);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    });
  });

  describe('It should be defined', () => {
    expect(appService).toBeDefined();
  });

  //   describe('setCache', () => {
  //     it('should return "Cache set"', async () => {
  //       jest.spyOn(cacheManager, 'set').mockImplementation(async () => {});
  //       expect(await appService.setCache()).toBe('Cache set');
  //     });
  //   });

  //   describe('getCache', () => {
  //     it('should return "value"', async () => {
  //       jest.spyOn(cacheManager, 'get').mockImplementation(async () => 'value');
  //       expect(await appService.getCache()).toBe('value');
  //     });
  //   });
});
