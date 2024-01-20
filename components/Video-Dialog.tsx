"use client";

import { useState } from "react";
import { PlayCircle, X } from "lucide-react";
import ReactPlayer from "react-player";

interface VideoDialogProps {
  url: string;
}

const VideoDialog = ({ url }: VideoDialogProps) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div>
      <div
        className="cursor-pointer flex space-x-1 items-center pl-5 relative"
        onClick={() => setShowPlayer(true)}
      >
        <PlayCircle />
        <p className="text-sm">
          <b>Play Trailer</b>
        </p>
      </div>

      {showPlayer && (
        <div
          className="absolute top-1/3 md:top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 
           opacity-100 z-50"
        >
          <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
            <span className="font-semibold">Playing Trailer</span>
            <div
              className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
              onClick={() => setShowPlayer(false)}
            >
              <X className="h-5" />
            </div>
          </div>
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${url}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              controls={true}
              playing={showPlayer}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDialog;
