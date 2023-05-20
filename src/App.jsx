
import MonitorPanel from './components/MonitorPanel';

const App = () => {
  return (
    <div>
      <h1>Coati</h1>
      <MonitorPanel maxPings={5} intervalMs={5000}/>
    </div>
  )
};

export default App;