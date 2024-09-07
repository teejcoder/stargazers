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
          className={'border mb-4 hover:cursor-pointer'}
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
                altText={pictureOfTheDay.title}
              />
            ) : (
              <div className="relative w-full pb-[56.25%]">
                <iframe 
                  src={pictureOfTheDay.url} 
                  title="NASA APOD Video"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
            <div className="my-10 mx-auto">
              <h1 className="mb-6 text-4xl">{pictureOfTheDay.title}</h1>
              <p className="text-start ">{pictureOfTheDay.explanation}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default GetImage;