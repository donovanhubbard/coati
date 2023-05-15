import React, {useState, useEffect} from 'react';

import LatencyGraph from './components/LatencyGraph';
import PacketLoss from './components/PacketLoss';

const App = () => {
  const PING_TARGET = 'google.com'

  const INTERVAL_MS = 5000;
  const MAX_PINGS = 10;

  const [pings,setPings] = useState([]);

  const processPing = async () => {
    let response = await window.pingProvider.sendPing();
    const timeString = new Date(Date.now()).toLocaleTimeString();

    response = {...response, formattedTime: timeString}

    console.log(response);

    const newPings =[...pings,response];

    if (pings.length >= MAX_PINGS) {
      newPings.shift();
    }

    setPings(newPings);
  }

  useEffect(() => {
    processPing();
  },[]);

  setTimeout(async () => {
    await processPing();
  },INTERVAL_MS);

  return (
    <div>
      <LatencyGraph responses={pings} />
      <PacketLoss responses={pings}/>

    </div>
  )
};

export default App;