import React from 'react';

import MonitorPanel from './components/MonitorPanel';

const App = () => {
  return (
    <div>
      <h1>Coati</h1>
      <MonitorPanel host='google.com' intervalMs='5000' maxPings='5' />
    </div>
  )
};

export default App;