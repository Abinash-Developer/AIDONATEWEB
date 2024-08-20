import axios from 'axios';

export async function fetchStates() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/state`);
      if (response.data && response.data.data) {
        return response.data.data;
      } else {
        throw new Error('Data does not exist');
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      throw new Error('An error occurred while fetching states');
    }
  }

  export async function fetchCities(stateId) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/cities/${stateId}`);
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Data does not exist');
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw new Error('An error occurred while fetching cities');
  }
}