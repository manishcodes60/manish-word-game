import React from "react";
import { useState, useRef, useEffect } from "react";

// Import the audio file
import backgroundSound from "../assets/audio/background_music.mp3";

// Import the icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
    // To track the click event of music button
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    // Set the mute attribute based on the isMuted state
    audioElement.muted = isMuted;

    // Play or pause the audio based on the isMuted state
    if (isMuted) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }, [isMuted]);

  return (
    <div className="Music-Section">
      <audio ref={audioRef} loop>
        <source src={backgroundSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button className="Music-Button" onClick={toggleMute}>
        <div className="Music-Button-Icon">
          {isMuted ? (
            <FontAwesomeIcon
              className={`music-on ${isClicked ? "clicked" : ""}`}
              icon={faVolumeHigh}
            />
          ) : (
            <FontAwesomeIcon
              className={`music-off ${isClicked ? "clicked" : ""}`}
              icon={faVolumeXmark}
            />
          )}
        </div>
      </button>
    </div>
  );
}

export default BackgroundMusic;
