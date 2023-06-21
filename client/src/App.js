import {Route, Routes} from 'react-router-dom'
import {Home} from './components/Home/Home';
import {DeskMap} from './components/DeskMap/DeskMap';
import { SocketProvider } from "./contexts/SocketContext/SocketContext";


function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/map' element={< DeskMap />} />
      </Routes>
    </SocketProvider>
  );
}

export default App;
