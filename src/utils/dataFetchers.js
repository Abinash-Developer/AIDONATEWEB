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

export async function checkWishList(ngoID) {
  try {
    const wishlistResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/fetch-wishlist-ByID/${ngoID}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    if(await wishlistResponse.data.data!=null){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw new Error('An error occurred while fetching cities');
  }
}
