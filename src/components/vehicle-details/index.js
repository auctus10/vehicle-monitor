import { useState } from 'react';
import { Button, Card, Feed, GridColumn, Icon } from 'semantic-ui-react';
import { XYPlot, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import 'react-vis/dist/style.css';
import dayjs from 'dayjs';

const VehicleDetails = ({vehicle}) => {

  const [selectedTrip, setSelectedTrip] = useState(null);

  const sortedByTime = vehicle.sort((a, b) => new Date(b.startTime) - new Date(a.startTime)).slice(0, 10);


  const energyData = sortedByTime.map((item) => {return {x: item.tripId, y : parseFloat((item.energy * 1000).toFixed(2))}});

  if(vehicle.length === 0){
    return <GridColumn className='page-coloumns'>Please select a vehicle</GridColumn>
  }

  const renderEnergyChart = () => (
    <Card raised fluid>
      <Card.Content>
        <Card.Header>Energy Consumed</Card.Header>
        <Card.Meta>
          <span>Last 10 trips</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content>
        <XYPlot dontCheckIfEmpty={true} height={610} width= {350}>
          <VerticalGridLines  />
          <HorizontalGridLines  />
          <XAxis title='Trip ID' tickTotal={10} />
          <YAxis title='Watts' tickTotal={30} />
          <LineMarkSeries data={energyData} />
        </XYPlot>
      </Card.Content>
    </Card>
  )

  const renderVehicleDetails = (item) => (
    <Feed.Event>
      <Feed.Label icon='taxi' />
      <Feed.Content>
        <Feed.Date content={`Started at : ${dayjs(item.startTime).format('hh:mm:ss A DD/MMM/YYYY')} , Ended at : ${dayjs(item.endTime).format('hh:mm:ss A DD/MMM/YYYY')}`} />
        <Feed.Summary>
          Trip ID - {item.tripId} , Distance Travelled - {(item.distance/1000).toFixed(2)} Km
          <Button style={{marginLeft : '1rem'}} basic size='small' icon labelPosition='left' onClick={() => setSelectedTrip(item)} >
            <Icon name='hand point right' />
            See trip details
          </Button>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );

  const renderTripDetails = () => {

    const { mode, tripId, distance, startTime, endTime, energy } = selectedTrip;

    return(
      <Card raised fluid>
        <Card.Content>
          <Card.Header>Trip Details</Card.Header>
          <Card.Meta>
            <span>Trip ID : {tripId}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content>
          <div>
            Mode Travelled in during trip - 
              <div style={{display: 'grid', marginTop: '0.5rem'}}>
                {mode && Object.keys(mode).map((i) => <l1>{i} - {mode[i]} %</l1>)}
              </div>
          </div>
        </Card.Content>
        <Card.Content>
          <div style={{display: 'grid', marginTop: '0.5rem'}}>
              <li>Distance Traveled - {(distance/1000).toFixed(2)} Km</li>
              <li>Trip Started at -  {dayjs(startTime).format('hh:mm:ss A DD/MMM/YYYY')}</li>
              <li>Trip Ended at - {dayjs(endTime).format('hh:mm:ss A DD/MMM/YYYY')}</li>
              <li>Energy consumed - { parseFloat((energy * 1000).toFixed(2))} Watts</li>
          </div>
        </Card.Content>
      </Card>
    );
  };
 
  return(
    <>
      <GridColumn className='page-coloumns'>
      <Card raised fluid>
        <Card.Content>
          <Card.Header>Last 10 trips - </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {sortedByTime.map(item => (renderVehicleDetails(item)))}
          </Feed>
        </Card.Content>
      </Card>
      </GridColumn>
      <GridColumn className='page-coloumns'>
         {renderEnergyChart()}
      </GridColumn>
      <GridColumn className='page-coloumns'>
         {selectedTrip ? renderTripDetails() : ''}
      </GridColumn>
    </>
  );
}

export default VehicleDetails;