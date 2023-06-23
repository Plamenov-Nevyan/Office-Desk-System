import {Route, Routes} from 'react-router-dom'
import {Home} from './components/Home/Home';
import {DeskMap} from './components/DeskMap/DeskMap';
import { SocketProvider } from "./contexts/socketContext";
import {ErrorBoundary} from './components/ErrorBoundary/ErrorBoundary';
import {ErrorContext} from './contexts/apiErrorContext';
import { useSocketErrorHandler } from './hooks/useSocketErrorHandler';


function App() {
  const {SocketErrorHandler, onError} = useSocketErrorHandler()
  return (
    <ErrorBoundary>
        <SocketErrorHandler>
          <SocketProvider>
            <Routes>
              <Route path='/' element={< Home onError={onError}/>} />
              <Route path='/map' element={< DeskMap onError={onError}/>} />
            </Routes>
          </SocketProvider>
        </SocketErrorHandler>
    </ErrorBoundary>
  );
}

export default App;
