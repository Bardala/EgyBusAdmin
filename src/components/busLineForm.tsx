import React from 'react';

export interface Busline {
  id?: number
  lineCode: string
  stationIdFrom: number
  stationIdTo: number
}

export const BusLine = () => {
  const [addLineCode, setAddLineCode] = React.useState('');
  const [addStationIdFrom, setAddStationIdFrom] = React.useState('');
  const [addStationIdTo, setAddStationIdTo] = React.useState('');
  const [doneAddMsg, setDoneAddMsg] = React.useState<boolean>(false);

  const [editLineCode, setEditLineCode] = React.useState('');
  const [editStationIdFrom, setEditStationIdFrom] = React.useState('');
  const [editStationIdTo, setEditStationIdTo] = React.useState('');
  const [doneEditMsg, setDoneEditMsg] = React.useState<boolean>(false);

  const [deleteLineCode, setDeleteLineCode] = React.useState('');
  const [doneDeleteMsg, setDoneDeleteMsg] = React.useState<boolean>(false);

  const {
    busLines,
    loading,
    addBusLine,
    getBusLines,
    editBusLine,
    deleteBusLine,
  } = useBusLine();

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBusLine(addLineCode, Number(addStationIdFrom), Number(addStationIdTo));
    setAddLineCode('');
    setAddStationIdFrom('');
    setAddStationIdTo('');
    setDoneAddMsg(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editBusLine(editLineCode, Number(editStationIdFrom), Number(editStationIdTo));
    setEditLineCode('');
    setEditStationIdFrom('');
    setEditStationIdTo('');
    setDoneEditMsg(true);
  };

  const handleDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deleteBusLine(deleteLineCode);
    setDeleteLineCode('');
    setDoneDeleteMsg(true);
  };

  return (
    <div className='component'>
      <h3>Bus Line</h3>
      
      {/* Add Bus Line Form */}
      <form onSubmit={handleAddSubmit}>
        <label htmlFor="addBusLine">Add Bus Line</label>
        <input name="lineCode" value={addLineCode} onChange={e => setAddLineCode(e.target.value)} placeholder="Line Code" />
        <input name="stationId_from" value={addStationIdFrom} onChange={e => setAddStationIdFrom(e.target.value)} placeholder="From Station" type='number' />
        <input name="stationId_to" value={addStationIdTo} onChange={e => setAddStationIdTo(e.target.value)} placeholder="To Station" type='number' />
        <button type="submit" className='add'>Add</button>
      </form>
      {doneAddMsg && !loading && (
        <p className='submitted-correctly'>
          Bus Line added successfully
        </p>
      )}

      {/* Edit Bus Line Form */}
      <form onSubmit={handleEditSubmit}>
        <label htmlFor="editBusLine">Edit Bus Line</label>
        <input name="lineCode" value={editLineCode} onChange={e => setEditLineCode(e.target.value)} placeholder="Line Code" />
        <input name="stationId_from" value={editStationIdFrom} onChange={e => setEditStationIdFrom(e.target.value)} placeholder="From Station" type='number' />
        <input name="stationId_to" value={editStationIdTo} onChange={e => setEditStationIdTo(e.target.value)} placeholder="To Station" type='number' />
        <button type="submit" className='edit'>Edit</button>
      </form>
      {doneEditMsg && !loading && (
        <p className='submitted-correctly'>
          Bus line edited successfully
        </p>
      )}

      {/* Delete Bus Line Form */}
      <form onSubmit={handleDeleteSubmit}>
        <label htmlFor="deleteBusLine">Delete Bus Line</label>
        <input name="lineCode" value={deleteLineCode} onChange={e => setDeleteLineCode(e.target.value)} placeholder="Line Code" />
        <button type="submit" className='delete'>Delete</button>
      </form>
      {doneDeleteMsg && !loading && (
        <p className='submitted-correctly'>
          Bus line deleted successfully
        </p>
      )}

      {/* Status Messages */}
      {loading && <p>Loading...</p>}

      {/* Get Bus Lines */}
      <button onClick={() => getBusLines()}>Get Bus Lines</button>
      {busLines && (
        <div className='busline-list'>
          {busLines.map((busLine) => (
            <div key={busLine.id} >
              <p>Line Code: {busLine.lineCode}</p>
              <p>Station From: {busLine.stationIdFrom}</p>
              <p>Station To: {busLine.stationIdTo}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const useBusLine = () => {
  const [addedBusLine, setAddedBusLine] = React.useState<Busline | null>(null);
  const [editedBusLine, setEditedBusLine] = React.useState<Busline | null>(null);
  const [deletedBusLine, setDeletedBusLine] = React.useState<Busline | null>(null);
  const [busLines, setBusLines] = React.useState<Busline[] | null>(null);
  const [Done, setDone] = React.useState<boolean>(false);
  
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const url = "http://www.busstation1.somee.com/api/BusLine";

  const addBusLine = async (lineCode: string, stationIdFrom: number, stationIdTo: number) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lineCode, stationIdFrom, stationIdTo }),
      });

      const data = await res.json();

      if (res.status === 201 || res.status === 200) {
        setDone(true);
        return;
      }
      if (!res.ok) {
        setError(new Error(data.message));
        return;
      }
      setAddedBusLine(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const getBusLines = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(new Error(data.message));
        return;
      }
      setBusLines(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const editBusLine = async (lineCode: string, stationId_from: number, stationId_to: number) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lineCode, stationId_from, stationId_to }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(new Error(data.message));
        return;
      }
      setEditedBusLine(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBusLine = async (lineCode: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/${lineCode}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(new Error(data.message));
        return;
      }
      setDeletedBusLine(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    addedBusLine,
    editedBusLine,
    deletedBusLine,
    busLines,
    loading,
    error,
    Done,
    addBusLine,
    getBusLines,
    editBusLine,
    deleteBusLine,
  };
};