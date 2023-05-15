import React, {useState, useEffect} from 'react';

import LatencyGraph from './LatencyGraph';
import PacketLossPanel from './PacketLossPanel';

const MonitorPanel = ({ host, intervalMs, maxPings }) => {
  const [pings,setPings] = useState([]);

  const processPing = async () => {
    let response = await window.pingProvider.sendPing(host);
    const timeString = new Date(Date.now()).toLocaleTimeString();

    response = {...response, formattedTime: timeString};

    console.log(response);

    const newPings =[...pings,response];

    if (pings.length >= maxPings) {
      newPings.shift();
    }

    setPings(newPings);
  }

  useEffect(() => {
    processPing();
  },[]);

  setTimeout(async () => {
    await processPing();
  }, intervalMs);

  return (
    <div>
      <h1>{host}</h1>
      <LatencyGraph responses={pings} host={host}/>
      <PacketLossPanel responses={pings}/>
    </div>
  )
};

export default MonitorPanel;