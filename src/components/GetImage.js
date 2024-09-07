import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getNasaData } from "../api/getNasaData";

function GetImage() {
  const [pictureOfTheDay, setPictureOfTheDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchPicture = async () => {
    try {
      const data = await getNasaData(selectedDate);
      setPictureOfTheDay(data);
    } catch (error) {
      console.error(`This error is in fetchPicture in GetImage.js component`, error);
    }
  }

  const ZoomableImageViewer = ({ imageUrl, altText }) => {
    const [zoomed, setZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const toggleZoom = () => {
      setZoomed(!zoomed);
      setPosition({ x: 0, y: 0 });
    };

    const handleMouseMove = (e) => {
      if (!zoomed) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setPosition({ x: (0.5 - x) * 100, y: (0.5 - y) * 100 });
    };

    useEffect(() => {
      const container = containerRef.current;
      if (zoomed) {
        container.style.cursor = 'zoom-out';
      } else {
        container.style.cursor = 'zoom-in';
      }
    }, [zoomed]);

    return (
      <div 
        ref={containerRef}
        className="relative w-full pb-[56.25%] overflow-hidden" 
        onClick={toggleZoom}
        onMouseMove={handleMouseMove}
      >
        <img 
          src={imageUrl} 
          alt={altText}
          className={`absolute inset-0 w-full h-full object-contain transition-transform duration-200 ${
            zoomed ? 'scale-250' : 'scale-100'
          }`}
          style={{
            transform: zoomed ? `scale(2.5) translate(${position.x}%, ${position.y}%)` : 'none'
          }}
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <div>
        <DatePicker
          showIcon
          className="border mb-4"
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
        {!pictureOfTheDay && (
          <span className="text-xs italic">Date must be after 1995-06-16, the first day an APOD picture was posted.</span>
        )}
      </div>

      {pictureOfTheDay && (
        <div className="mx-auto flex items-center justify-center flex-col">
          {pictureOfTheDay.media_type === "image" ? (
            <ZoomableImageViewer 
              imageUrl={pictureOfTheDay.hdurl || pictureOfTheDay.url} 
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
      )}
    </div>
  );
}

export default GetImage;