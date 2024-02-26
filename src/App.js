import Register from "./components/Register";
// import ipConfig from "./ipConfig.json";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";

export const config = {
  endpoint: `https://qkart-stus.onrender.com/api/v1`,
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
