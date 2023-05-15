import React, {useState, useEffect} from 'react';

const App = () => {
  const PING_TARGET = 'google.com'

  const INTERVAL_MS = 5000;
  const MAX_PINGS = 5;

  const [pings,setPings] = useState([]);

  const processPing = async () => {
    const response = await window.pingProvider.sendPing();
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

  const pingRenders = pings.map((ping) => {
    return (
      <li>
        <h2>{ping.time}</h2>
      </li>
    )
  });

  return (
    <div>
      <h1>Pings</h1>
      <ul>
        {pingRenders}
      </ul>
    </div>
  )
};

export default App;