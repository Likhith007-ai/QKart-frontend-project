import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout"
import Thanks from "./components/Thanks";

export const config = {
  endpoint: `https://qkart-frontend-vaip.onrender.com/api/v1`,
};


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Products} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/Thanks" component={Thanks} />
        
      </Switch>
    </div>
  );
}

export default App;
