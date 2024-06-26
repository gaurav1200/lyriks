import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useState } from "react";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const { data, isFetching, error } = useGetTopChartsQuery();
  const [genreTitle, setGenreTitle] = useState("Pop");

  // const downloadFile = () => {
  //   const link = document.createElement("a");
  //   var jsonse = JSON.stringify(data);
  //   const file = new Blob([jsonse], { type: "application/json" });
  //   link.href = URL.createObjectURL(file);
  //   link.download = "sample.json";
  //   link.click();
  //   URL.revokeObjectURL(link.href);
  // };
  // downloadFile();

  // let isFetching = false;
  // let data = sample;
  // let error = false;

  // const genreTitle = "Pop";

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col ">
      <div className="w-auto flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => {
            genres.map((genre) => {
              if (genre.value === e.target.value) {
                setGenreTitle(genre.title);
              }
            });
            dispatch(selectGenreListId(e.target.value));
          }}
          value={genreListId}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
