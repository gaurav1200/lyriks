import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import {
  useGetCountriesQuery,
  useGetSongsByCountryQuery,
} from "../redux/services/shazamCore";

const VITE_GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [listId, setListId] = useState(""); //listid
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  console.log(country);
  const { data, isFetching, error } = useGetCountriesQuery();
  if (!country === "") {
    let countryListId = data?.countries?.map((item) => {
      if (item.id === country) return item.listid;
    });
    if (countryListId.length > 0) setListId(countryListId[0]);
  }
  const {
    data: songData,
    isFetching: isSongDataFetching,
    error: songDataError,
  } = useGetSongsByCountryQuery({ listId });
  console.log(songData);
  console.log(data);
  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://geo.ipify.org/api/v2/country?apiKey=${VITE_GEO_API_KEY}`)
      .then((response) => setCountry(response?.data?.location?.country))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [country]);
  if (isFetching && isSongDataFetching && loading)
    return <Loader title="Loading songs around you..." />;
  if (error || songDataError) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">in {country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songData?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songData}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};
export default AroundYou;
