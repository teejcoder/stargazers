import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getNasaData } from "../api/getNasaData";

function GetImage() {
  const [pictureOfTheDay, setPictureOfTheDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchPicture = async () => {
    try {
      const data = await getNasaData(selectedDate);
      setPictureOfTheDay(data);
    } catch (error) {
      console.error(`This error is in fetchPicture in GetImage.js component`, error);
    }
  }

  return (
    <div className="container mx-auto">
      <div>
        <DatePicker
          showIcon
          className={'border mb-4'}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy/MM/dd"
        />

        <button 
          onClick={fetchPicture}
          className="h-10 ml-10 px-10 rounded-2xl bg-white text-black hover:bg-red-600"
        >
          Click to get pic
        </button>

      </div>
      <div className="mb-10">
        {
          !pictureOfTheDay ? 
          <span className="text-xs italic">Date must be after 1995-06-16, the first day an APOD picture was posted.</span>
          : <span></span>
        }
      </div>

      {pictureOfTheDay && (
        <div className="mx-auto flex items-center justify-center flex-col">
            {pictureOfTheDay.media_type === "image" ? (
              <img src={pictureOfTheDay.hdurl ? (pictureOfTheDay.hdurl) : (pictureOfTheDay.url)} className="w-3/4 border-2 border-white rounded-3xl max-w-full" alt={pictureOfTheDay.title} /> 
            ) : (
              <iframe src={pictureOfTheDay.url} title="iframe element" className="max-w-full" alt={pictureOfTheDay.title} />
            )}
          <div className="">
            <h1 className="mb-10 text-3xl">{pictureOfTheDay.title}</h1>
            <p className="text-start">{pictureOfTheDay.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetImage;
