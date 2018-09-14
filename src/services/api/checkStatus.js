import { NetworkError } from './errorMessages';

export async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    var responseData = await response.json();
    if (responseData != null && responseData.message != null) {
      throw new Error(responseData.message);
    } else {
      throw new Error(NetworkError);
    }
  }
}
