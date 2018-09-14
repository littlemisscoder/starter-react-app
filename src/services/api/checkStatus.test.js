import { checkStatus } from './checkStatus';
import { NetworkError } from './errorMessages';

describe('checkStatus ', () => {
  it('should return response.json() when request is successful', () => {
    //Given
    const data = {
      message: 'Successful'
    };
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    });
    const init = { status: 200 };
    const myResponse = new Response(blob, init);

    //When
    const result = checkStatus(myResponse);

    //Then
    result.then(resultData => expect(resultData).toEqual(data));
  });

  it('should throw err with data.message when request is not successful', () => {
    //Given
    const data = {
      message: 'Failed: Server Error'
    };
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    });
    const init = { status: 400 };
    const myResponse = new Response(blob, init);

    //When
    expect(checkStatus(myResponse)).rejects.toEqual(new Error(data.message));
  });

  it('should throw error with general network error when request is not successful and data is null', () => {
    //Given
    const data = null;
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    });
    const init = { status: 400 };
    const myResponse = new Response(blob, init);

    //When
    expect(checkStatus(myResponse)).rejects.toEqual(new Error(NetworkError));
  });

  it('should throw error with general network error when request is not successful and data.message is null', () => {
    //Given
    const data = {
      message: null
    };
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    });
    const init = { status: 400 };
    const myResponse = new Response(blob, init);

    //When
    expect(checkStatus(myResponse)).rejects.toEqual(new Error(NetworkError));
  });
});
