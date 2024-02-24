import Register from "./components/Register";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import ipConfig from "./ipConfig.json";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <Router>
    <div className="App">
    <Switch>
      <Route path = "/Register" >
      <Register />
      </Route>
      <Route path = "/Login" >
      <Login/>
      </Route>
      <Route path="/">
            <Products />
          </Route>
    
     </Switch>
    </div>
    </Router>
  );
}

export default App;

