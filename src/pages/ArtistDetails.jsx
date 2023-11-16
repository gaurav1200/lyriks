import { useParams } from "react-router-dom";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import {
  useGetArtistDetailsQuery,
  useGetTopSongsByArtistQuery,
} from "../redux/services/shazamCore";
import sample from "../assets/sample.json";

import { useSelector } from "react-redux";

const ArtistDetails = () => {
  const { id: artistId } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery({ artistId });
  const {
    data: songData,
    isFetching: isFetchingSongsDetails,
    error: songDataError,
  } = useGetTopSongsByArtistQuery({ artistId });
  console.log(songData);
  if (isFetchingArtistDetails || isFetchingSongsDetails)
    return <Loader title="Loading artist details..." />;

  if (error || songDataError) return <Error />;

  return (
    <div className="flex flex-col flex-1">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        artistData={songData}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
