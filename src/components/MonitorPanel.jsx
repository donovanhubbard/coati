import React, { useState, useEffect, useRef } from 'react';

import LatencyGraph from './LatencyGraph';

const MonitorPanel = ({maxPings, intervalMs}) => {

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
        if (newPings.length > maxPings) {
          newPings.shift();
        }
        const newHostObj = {...hostObj, pings: newPings};
        hostObjs.push(newHostObj);
      }

      setHosts(hostObjs);
    }, intervalMs);
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
      <LatencyGraph hostObjs={hosts} />
    </div>
  )
};

export default MonitorPanel;