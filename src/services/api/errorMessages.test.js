import { NetworkError } from './errorMessages';

describe('errorMessages ', () => {
  it('NetworkError should return "Network Error: Unable to process request, please try again."', () => {
    expect(NetworkError).toBe(
      'Network Error: Unable to process request, please try again.'
    );
  });
});
