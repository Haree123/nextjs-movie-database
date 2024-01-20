"use client";
import ReactPlayer from "react-player/lazy";

interface VideoCardsProps {
  url: string;
}

const VideoCards = ({ url }: VideoCardsProps) => {
  return (
    <>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${url}`}
        muted={false}
        controls={true}
        height={250}
        width={450}
        volume={0.5}
      />
    </>
  );
};

export default VideoCards;
