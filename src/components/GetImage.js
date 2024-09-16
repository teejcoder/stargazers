import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getNasaData } from "../api/getNasaData";
import ImageZoom from "react-image-zooom";

import Spinner from "./ui/Spinner";

function GetImage() {
  const [pictureOfTheDay, setPictureOfTheDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPicture = async () => {
      setLoading(true);
      try {
        const data = await getNasaData(selectedDate);
        setPictureOfTheDay(data);
      } catch (error) {
        console.error(`This error is in fetchPicture in GetImage.js component`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchPicture();
  }, [selectedDate]);

  
  return (
    <div className="container">
      <div className="relative z-10 mb-4">
        <DatePicker
          showIcon
          className="border border-gray-300 bg-white rounded-lg shadow-sm p-2 hover:border-blue-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200 ease-in-out"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy/MM/dd"
        />
      </div>
      <div className="mb-10">
        {!pictureOfTheDay && !loading && (
          <span className="text-xs italic">Date must be after 1995-06-16, the first day an APOD picture was posted.</span>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        pictureOfTheDay && (
          <div className="mx-auto flex items-center justify-center flex-col">
            {pictureOfTheDay.media_type === "image" ? (
              <ImageZoom
                src={pictureOfTheDay.hdurl || pictureOfTheDay.url} 
                alt={pictureOfTheDay.title}
                className="w-full h-auto rounded-2xl mb-10"
                loading="lazy"
              />
            ) : (
              <iframe 
                src={pictureOfTheDay.url} 
                title="NASA APOD Video"
                className="absolute inset-0 w-full h-full rounded-2xl"
                allowFullScreen
              />
            )}
            <div className="text-start w-full h-auto p-10 my-10 bg-white/80 text-black transparent-1 rounded-2xl">
              <h1 className="text-2xl md:text-4xl">{pictureOfTheDay.title}</h1>
              <span className="font-bold">{pictureOfTheDay.date}</span>

              <p className="my-4 text-lg md:text-2xl">{pictureOfTheDay.explanation}</p>
              <span className="italic">~{pictureOfTheDay.copyright}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default GetImage;