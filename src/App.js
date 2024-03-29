import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NASA_API = process.env.REACT_APP_NASA_API;

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [pictureOfTheDay, setPictureOfTheDay] = useState(null);

  useEffect(() => {
    const getPicture = async () => {
      if (!selectedDate) return; 

      const formattedDate = selectedDate.toISOString().split('T')[0];

      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=${NASA_API}`);
        if (!response.ok) {
          throw new Error('Failed to fetch picture of the day');
        }
        const data = await response.json();
        setPictureOfTheDay(data);
      } catch (error) {
        console.error('Error fetching picture of the day:', error);
      }
    };

    getPicture();
  }, [selectedDate]);

  return (
    <div className="App">
      <div>
        <h1>Aus Stargazers NASA Picture of the Day!</h1>
      </div>

      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
      />

      {pictureOfTheDay && (
        <div>
          <img src={pictureOfTheDay.url} alt={pictureOfTheDay.title} />
          <h2>{pictureOfTheDay.title}</h2>
          <p>{pictureOfTheDay.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
