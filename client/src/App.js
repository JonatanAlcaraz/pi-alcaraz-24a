import './App.css';
import CreateGame from './components/CreateGame'
import Detail from './components/Detail'
import { getVidegoames } from './redux/actions';
import Landing from './components/Landing';
import Platforms from './components/Platforms';
import Home from './components/Home';
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/platforms' exact component={Platforms}/>
        <Route path='/' exact component={Landing}/>
        <Route path='/home' exact component={Home}/>
        <Route path='/detail/:id' exact component={Detail}/>
        <Route path='/create' exact component={CreateGame}/>
      </Switch>
    </div>
  );
}

export default App;
