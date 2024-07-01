import { useState } from 'react';
import { BusLine } from "../components/busLineForm";
import { Driver } from "../components/Driver";
import { Station } from "../components/stationForm";
import { FaBus, FaUser, FaTrain } from 'react-icons/fa';

export const Admin = () => {
  const [activeComponent, setActiveComponent] = useState('station');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'station':
        return <Station />;
      case 'busline':
        return <BusLine />;
      case 'driver':
        return <Driver />;
      default:
        return <Station />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="sidebar">
        <button onClick={() => setActiveComponent('station')}>
          <FaTrain style={{ marginRight: '10px' }} />
          Station Management
        </button>
        <button onClick={() => setActiveComponent('busline')}>
          <FaBus style={{ marginRight: '10px' }} />
          Busline Management
        </button>
        <button onClick={() => setActiveComponent('driver')}>
          <FaUser style={{ marginRight: '10px' }} />
          Driver Management
        </button>
      </div>

      <div className="main-content">
        {/* <div className="container"> */}
          {renderComponent()}
        {/* </div> */}
      </div>
    </div>
  );
}
