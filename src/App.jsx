import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from "./pages";
import Player from "./components/MusicPlayer/Player";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

const visitEndpoint = import.meta.env.VITE_VISIT_API_ENDPOINT;
const App = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [musicPlayer, setMusicPlayer] = useState(false);
  const handleHideClick = () => {
    setMusicPlayer(true);
  };
  const handleShowClick = () => {
    setMusicPlayer(false);
  };
  useEffect(() => {
    if (sessionStorage.getItem("visit")) {
      console.log("visited");
    } else {
      const data = {
        webSiteName: "lyriks",
        count: 1,
      };
      axios
        .post(`${visitEndpoint}/visit`, { data })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    sessionStorage.setItem("visit", true);
  }, []);

  return (
    <div className="relative flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        {/* <Searchbar /> */}

        <div className="px-6 h-[calc(100vh)] overflow-y-scroll hide-scrollbar flex lg:flex-row  xl:flex-row flex-col-reverse">
          <div className="flex-1 flex h-fit pb-40 ">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>

          <div className="xl:sticky lg:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {(activeSong?.title || activeSong?.name) && (
        <div
          className={`absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10 
          ${musicPlayer ? "hidden" : ""} `}
        >
          <MusicPlayer />
          <MdKeyboardArrowDown
            className="h-6 w-6 text-white mr-5"
            onClick={handleHideClick}
          />
        </div>
      )}
      {musicPlayer && (
        <div
          className="absolute h-5 bottom-0  flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10 
          right-0 left-0 "
        >
          <MdKeyboardArrowUp
            className="absolute h-6 w-6 text-white right-5"
            onClick={handleShowClick}
          />
        </div>
      )}
    </div>
  );
};

export default App;
