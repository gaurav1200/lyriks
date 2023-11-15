import { useParams } from "react-router-dom";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { useEffect } from "react";

const SongDetails = () => {
  const { songid } = useParams();
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });

  return (
    <div className="flex flex-col flex-1">
      <DetailsHeader songData={songData} />
      <div className="mb-10 mt-5">
        <h2 className="font-bold text-3xl text-white">Lyrics:</h2>
        <div className="mt-5">
          {isFetchingSongDetails && <Loader />}
          {error && <Error />}
          {songData?.resources?.lyrics ? (
            songData?.resources?.lyrics[
              Object.keys(songData?.resources?.lyrics)[0]
            ].attributes.text.map((line) => {
              return <p className="text-gray-400 text-base my-1">{line}</p>;
            })
          ) : (
            <p className="text-gray-400 text-base my-1">No lyrics available</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default SongDetails;
