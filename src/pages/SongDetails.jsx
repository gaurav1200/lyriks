import { useParams } from "react-router-dom";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import sample from "../assets/sample.json";

import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });
  const relatedTracksId =
    songData?.resources?.["related-tracks"][
      Object.keys(songData?.resources?.["related-tracks"])[0]
    ]?.id;
  const {
    data: relatedSongsData,
    isFetching: isFetchingRelatedSongs,
    error: relatedSongError,
  } = useGetSongRelatedQuery({ relatedTracksId });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const data = sample;
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title="Searching song details..." />;

  if (relatedSongError || error) return <Error />;
  return (
    <div className="flex flex-col flex-1">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
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
      <RelatedSongs
        songData={relatedSongsData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};
export default SongDetails;
