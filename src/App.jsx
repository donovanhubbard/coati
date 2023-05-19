import React, { useState, useEffect, useRef } from 'react';

import LatencyGraph from './components/LatencyGraph';

const App = () => {
  const MAX_PINGS = 5;
  const INTERVAL_MS = 5000;

  const googleObj = {
    displayName: 'google.com',
    host: 'google.com',
    pings: [],
  }

  const [hosts, setHosts] = useState([googleObj]);
  const hostsRef = useRef(hosts);
  hostsRef.current = hosts;

  const sendPing = async (host) => {
    let response = await window.pingProvider.sendPing(host);
    const timeString = new Date(Date.now()).toLocaleTimeString();
    return {...response, formattedTime: timeString};
  };

  useEffect(() => {
    const timeout = setInterval(async () => {

      const hostObjs = []
      
      for (const hostObj of hostsRef.current){
        const response = await sendPing(hostObj.host);
        const newPings = [...hostObj.pings, response];
        if (newPings.length > MAX_PINGS) {
          newPings.shift();
        }
        const newHostObj = {...hostObj, pings: newPings};
        hostObjs.push(newHostObj);
      }

      setHosts(hostObjs);
    }, INTERVAL_MS);
    return () => clearInterval(timeout);
  },[]);

  useEffect(async () => {
    window.pingProvider.getGateway().then((result) => {
      const gatewayObj = {
        displayName: "local gateway",
        host: result,
        pings: [],
      }
      setHosts([...hosts, gatewayObj]);
    });
  },[]);

  return (
    <div>
      <h1>Coati</h1>
      <LatencyGraph hostObjs={hosts} />
    </div>
  )
};

export default App;