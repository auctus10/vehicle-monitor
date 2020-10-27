import { Menu, Grid, GridColumn } from 'semantic-ui-react';
import { useState } from 'react';
import './index.css';
import vehicleData from './fe_data.json';
import VehicleDetails from '../vehicle-details';

const MainPage = () => {
  const [selectedVehicleData, setSelectedVehicleData] = useState([])

  return (
    <>
      <div className='simple-navbar'>
        <div className='page-title-wrapper'>
            <div className='page-title'> 
              <div className='content-boxed'>
                <h1>Monitor The Vehicles</h1>
                <span className='page-subtitle'>Get started below</span>
              </div>
            </div>
        </div>
      </div>
      <Grid relaxed='very'>
        <GridColumn className='page-coloumns'>
          <Menu className="side-navbar" secondary vertical>
            <Menu.Item header>VEHICLES</Menu.Item>
            {[...new Set(vehicleData.trip.map(item => item.vin))].map(vehicle => (
              <Menu.Item active={selectedVehicleData[0].vin === vehicle} key={vehicle} name={vehicle.split('_').join(' ')} onClick={() => setSelectedVehicleData(vehicleData.trip.filter(v => v.vin === vehicle))} />
            ))}
          </Menu>
        </GridColumn>
        <VehicleDetails vehicle={selectedVehicleData} />
      </Grid>
    </>
  )
}

export default MainPage;