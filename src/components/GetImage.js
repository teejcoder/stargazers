import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NASA_API = process.env.REACT_APP_NASA_API;

function getRandomImage(){

}

function GetImage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [pictureOfTheDay, setPictureOfTheDay] = useState(null);

  useEffect(() => {
    const getPicture = async () => {
      if (!selectedDate) return; 
      const formattedDate = selectedDate.toISOString().split('T')[0];
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=${NASA_API}`);
        const data = await response.json();
        console.log(data)
        setPictureOfTheDay(data);
      } catch (error) {
        console.error('Error fetching picture of the day:', error);
      }
    };

    getPicture();
  }, [selectedDate]);

  return (
    <div className="">
      <div className="border h-20 flex items-center justify-center mb-10">
        <h1>Aus Stargazers</h1>
      </div>
        {
          !pictureOfTheDay ? 
          <h2>Date?</h2>
          : <span></span>
        }
      <div>
        <DatePicker
          showIcon
          className={'border mb-4'}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy/MM/dd"
        />
        </div>
        <div className="mb-10">
        {
        !pictureOfTheDay ? 
        <span className="text-xs italic">Date must be after 1995-06-16, the first day an APOD picture was posted.</span>
        : <span></span>
      }
      </div>

      {pictureOfTheDay && (
          <div className="">
            {pictureOfTheDay.media_type === "image" ? (
              <img src={pictureOfTheDay.hdurl ? (pictureOfTheDay.hdurl) : (pictureOfTheDay.url)} className="block max-width-screen mb-10" alt={pictureOfTheDay.title} /> 
            ) : (
              <iframe src={pictureOfTheDay.url} title="iframe element" className="block max-width-screen mb-10" alt={pictureOfTheDay.title} />
            )}
            <div className="">
              <h2 className="mb-6">{pictureOfTheDay.title}</h2>
              <p>{pictureOfTheDay.explanation}</p>
            </div>
          </div>
        )}
    </div>
  );
}

export default GetImage;
