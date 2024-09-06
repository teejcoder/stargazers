const NASA_API = process.env.REACT_APP_NASA_API;

export const getNasaData = async (date) => {
  if (!date) return null;
  const formattedDate = date.toISOString().split('T')[0];
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=${NASA_API}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching picture of the day:', error);
    throw error;
  }
};