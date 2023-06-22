import {Route, Routes} from 'react-router-dom'
import {Home} from './components/Home/Home';
import {DeskMap} from './components/DeskMap/DeskMap';
import { SocketProvider } from "./contexts/socketContext";
import {ErrorBoundary} from './components/ErrorBoundary/ErrorBoundary';


function App() {
  return (
      <ErrorBoundary>
    <SocketProvider>
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/map' element={< DeskMap />} />
      </Routes>
    </SocketProvider>
    </ErrorBoundary>
  );
}

export default App;
