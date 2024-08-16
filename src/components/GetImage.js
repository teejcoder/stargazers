import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Particles from "./ui/Particles";

const NASA_API = process.env.REACT_APP_NASA_API;

function GetImage() {
  const [pictureOfTheDay, setPictureOfTheDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPicture = async () => {
      if (!selectedDate) return; 
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setLoading(true);
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=${NASA_API}`);
        const data = await response.json();
        console.log(data)
        setPictureOfTheDay(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching picture of the day:', error);
      }
    };

    getPicture();
  }, [selectedDate]);

  return (
    <div className="">
      <div className="h-20 flex items-center justify-center mb-10">
        <h1 className="text-4xl">Aus Stargazers</h1>
      </div>
      <Particles
        quantity={500}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
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
              <img src={pictureOfTheDay.hdurl ? (pictureOfTheDay.hdurl) : (pictureOfTheDay.url)} className="block max-width-full mb-10" alt={pictureOfTheDay.title} /> 
            ) : (
              <iframe src={pictureOfTheDay.url} title="iframe element" className="block max-width-screen mb-10" alt={pictureOfTheDay.title} />
            )}
            <div className="mb-20">
              <h2 className="mb-10 text-xl">{pictureOfTheDay.title}</h2>
              <p className="text-start">{pictureOfTheDay.explanation}</p>
            </div>
            
          </div>
        )}
    </div>
  );
}

export default GetImage;
