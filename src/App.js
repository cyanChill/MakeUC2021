import "./styles/App.scss";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./auth/protected-route";

import Loading from "./components/Loading";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./views/Profile";
import EventForm from "./components/EventForm";
import Event from "./views/Event";
import EditForm from "./components/EditForm";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute exact path="/form" component={EventForm} />
          <ProtectedRoute path="/form/edit/:id" component={EditForm} />
          <Route path="/event/:id" component={Event} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
