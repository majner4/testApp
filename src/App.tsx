import { Route, Switch } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={SignInPage} exact />
      <Route path="/login" component={SignInPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/profile" component={ProfilePage} />
    </Switch>
  );
};

export default App;
