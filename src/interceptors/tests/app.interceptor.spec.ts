import { LogInterceptor } from '../app.interceptor';

describe('LogInterceptor', () => {
  it('should be defined', () => {
    expect(new LogInterceptor()).toBeDefined();
  });
});
