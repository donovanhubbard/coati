import React, { useState, useEffect } from 'react';

import MonitorPanel from './components/MonitorPanel';

const App = () => {

  const [gateway, setGateway] = useState(null);

  useEffect(async () => {
    window.pingProvider.getGateway().then((result) => {
      setGateway(result);
    });
  },[]);

  const gatewayPanel = gateway ? <MonitorPanel host={gateway} intervalMs='5000' maxPings='5' /> : null;

  return (
    <div>
      <h1>Coati</h1>
      <MonitorPanel host='google.com' intervalMs='5000' maxPings='5' />
      {gatewayPanel}
    </div>
  )
};

export default App;