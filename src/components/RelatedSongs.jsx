import SongBar from "./SongBar";

const RelatedSongs = ({
  songData,
  artistData,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  let data;
  if (songData) data = Object.values(songData?.resources?.["shazam-songs"]);
  else data = Object.values(artistData?.data);
  console.log(songData?.resources?.["shazam-songs"]);
  console.log(data);
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white">Related Songs:</h2>
      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
            key={song.id}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, i)}
          />
        ))}
      </div>
    </div>
  );
};
export default RelatedSongs;
