import { RequestService } from 'src/services/userRequest.service';
import { AuthMiddleware } from '../auth.middleware';

describe('AuthMiddleware', () => {
  const request: RequestService = new RequestService();
  it('should be defined', () => {
    expect(new AuthMiddleware(request)).toBeDefined();
  });
});
