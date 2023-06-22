import { RequestService } from 'src/services/request.service';
import { AuthMiddleware } from '../auth.middleware';

describe('AuthMiddleware', () => {
  const request: RequestService = new RequestService();
  it('should be defined', () => {
    expect(
      new AuthMiddleware(request),
      // new RequestService(),
    ).toBeDefined();
  });
});
