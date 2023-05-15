import React from 'react';

const PacketLoss = ({ responses }) => {
  let packetLoss = 0;
  if(responses && responses.length > 0){
    const numPings = responses.length;
    const numPacketsLost = responses.filter((response) => response.time === 'unknown').length;
    packetLoss = Math.round((numPacketsLost / numPings) * 100);
  }

  return (
    <div>
      <h1>Packet Loss {packetLoss}%</h1>
    </div>
  )
};

export default PacketLoss;