import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  console.log(artistData);
  const artist = artistData?.data[0].attributes;
  const song =
    songData?.resources?.["shazam-songs"][
      Object.keys(songData?.resources?.["shazam-songs"])[0]
    ].attributes;
  const artist2 =
    songData?.resources?.["artists"][
      Object.keys(songData?.resources?.["artists"])[0]
    ];
  const genre =
    songData?.resources?.["genres"][
      Object.keys(songData?.resources?.["genres"])[0]
    ].attributes;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"></div>
      <div className="absolute inset-0 flex items-center">
        <img
          alt="art"
          src={
            artistId
              ? artistData.data[0].attributes.artwork?.url
                  .replace("{w}", "500")
                  .replace("{h}", "500")
              : song?.images?.coverArt
          }
          className="sm:h-48 h-28 w-28 sm:w-48 rounded-full border-2 obhect-cover shadow-xl shadow-black"
        />
        {/* <img
          alt="art"
          src={song?.images?.coverArt}
          className="sm:h-48 h-28 w-28 sm:w-48 rounded-full border-2 obhect-cover shadow-xl shadow-black"
        /> */}

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artist.name : song?.title}
          </p>
          {!artistId && (
            <Link to={`/artist/${artist2?.id}`}>
              <p className="text-base text-gray-400 mt-2">
                {song?.primaryArtist}
              </p>
            </Link>
          )}
          <p className="text-base text-gray-400 mt-2">
            {artistId ? artist?.genreNames[0] : genre?.name}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};
export default DetailsHeader;
