import { RequestService } from 'src/services/userRequest.service';
import { LogInterceptor } from '../app.interceptor';

describe('LogInterceptor', () => {
  const requestService = new RequestService();
  it('should be defined', () => {
    expect(new LogInterceptor(requestService)).toBeDefined();
  });
});
