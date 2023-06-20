import {Route, Routes} from 'react-router-dom'
import {Home} from './components/Home/Home';
import {DeskMap} from './components/DeskMap/DeskMap';



function App() {
  return (
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/map' element={< DeskMap />} />
      </Routes>
  );
}

export default App;
