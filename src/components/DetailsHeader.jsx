import { Link } from "react-router-dom";

{
  Link;
}

const DetailsHeader = ({ songData }) => {
  //  const artist=  artistData?.artists[artistId].attributes;
  const song =
    songData?.resources?.["shazam-songs"][
      Object.keys(songData?.resources?.["shazam-songs"])[0]
    ].attributes;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"></div>
      <div className="absolute inset-0 flex items-center">
        {/* <img
        alt="art"
        src={
          artistId
            ? artist.artwork?.url
                .replace("{wa}", "500")
                .replace("{h}", "500")
            : songData.images?.coverart
        }
        className="sm:h-48 h-28 w-28 sm:w-48 rounded-full border-2 obhect-cover shadow-xl shadow-black"
      /> */}
        <img
          alt="art"
          src={song?.images?.coverArt}
          className="sm:h-48 h-28 w-28 sm:w-48 rounded-full border-2 obhect-cover shadow-xl shadow-black"
        />
        {/* <div className="ml-5">
          <p> {artistId ? artis.name : song.title}</p>
        </div> */}
        <div className="ml-5 text-xl font-bold text-white">
          <p> {song?.title}</p>
        </div>
      </div>
    </div>
  );
};
export default DetailsHeader;
