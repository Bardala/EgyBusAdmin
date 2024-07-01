import React, { useState } from 'react';

export interface IStation {
  name: string;
  location: string;
  stationLat: string;
  stationLong: string;
}

export const Station = () => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const { addStation, error, loading, station } = useAddStation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStation(name, location, Number(latitude), Number(longitude));
  };

  return (
    <div className='component'>
      <h3 >Station</h3>

      <form onSubmit={handleSubmit} >
        <label htmlFor="add station">Add Station</label>
        <input name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input name="location" value={location} onChange={e=> setLocation(e.target.value)} placeholder="Location" />
        <input name="latitude" value={latitude} onChange={e=> setLatitude(e.target.value)} placeholder="latitude" type='number' />
        <input name="longitude" value={longitude} onChange={e=> setLongitude(e.target.value)} placeholder="longitude" type='number' />
        <button type="submit" >Save</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {station && (
        <p className='submitted-correctly'>
          Station {station.name} has been added with location {station.location} and latitude {station.stationLat} and longitude {station.stationLong}
        </p>
      )}
    </div>
  );
};  

const useAddStation = () => {
  const [station, setStation] = useState<IStation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addStation = async (name: string, location: string, latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const res = await fetch('http://www.busstation1.somee.com/api/Station', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location, stationLat: latitude, stationLong: longitude }),
      });
      const data = await res.json();
      setStation(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { station, loading, error, addStation };
}