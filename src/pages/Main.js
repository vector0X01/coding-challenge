import React, { useState } from 'react';
import osmtogeojson from 'osmtogeojson';
import InputForm from '../components/InputForm';
import Features from './Features';
import Loader from '../components/Loader';
import { getOSM } from '../api/getOSM';

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [geoJSON, setGeoJSON] = useState({ data: [], error: null });

  const handleAPIcall = async (params) => {
    setLoading(true);
    const { data, error } = await getOSM(params);
    if (error) {
      setLoading(false);
      setGeoJSON({ data: [], error: error.response.data });
    }
    if (data) {
      const geoJSON = osmtogeojson(data);
      setGeoJSON({ data: geoJSON.features, error: null });
      setLoading(false);
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
    setGeoJSON({ data: [], error: null });
  };

  return (
    <div className="main">
      <Loader loading={loading} />
      <h1>Coding Challenge</h1>
      <InputForm onSubmit={handleAPIcall} error={geoJSON.error} />
      {geoJSON.data.length ? (
        <Features handleClose={handleClose} show={show} geoJSONData={geoJSON.data} />
      ) : null}
    </div>
  );
};

export default Main;
