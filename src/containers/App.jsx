import React from "react";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";
import userPersister from "../methods/userPersister";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Components
import MainNavbarContainer from "./MainNavbarContainer";
import SubNavbarContainer from "./SubNavbarContainer";
import RegisterContainer from "./RegisterContainer";
import Footer from "../components/Footer";
import Carousel from "./Carousel";
import LoginContainer from "./LoginContainer";
import BooksContainer from "./BooksContainer";
import CartContainer from "./CartContainer";
import SingleBookContainer from "./SingleBookContainer";
import UserHistoryContainer from "./UserHistoryContainer";
import UsersContainer from "./UsersContainer";
import HistoryContainer from "./HistoryContainer";
import Contact from "../components/Contact";
import About from "../components/About";
import SingleUserContainer from "./SingleUserContainer";
import BooksEditContainer from "./BooksEditContainer";
import AddBookContainer from "./AddBookContainer";
import NoResults from "../components/NoResults";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser(userPersister()));
  }, [dispatch]);

  return (
    <div>
      <MainNavbarContainer />
      <SubNavbarContainer/>

      <Switch>
        <Route
          exact path="/"
          render={() => (
            <div>
              <Carousel
                title="Latest Releases"
                info="Discover the very latest titles from the worlds of fiction, non-fiction and children’s. These great volumes are all out now."
              />
              <Carousel
                title="Best Sellers"
                info="Discover our bestselling books and see what's trending worldwide."
              />
            </div>
          )}
        />

        <Route path="/register" component={RegisterContainer} />
        <Route path="/login" component={LoginContainer} />

        <Route exact path="/books" component={BooksContainer} />
        <Route path="/no_results" component={NoResults} />
        <Route
          path="/books/:bookId"
          render={({ match }) => (
            <SingleBookContainer bookId={match.params.bookId} />
          )}
        />
        <Route path="/newbook" component={AddBookContainer} />
        <Route path="/edit" component={BooksEditContainer} />

        <Route path="/cart" component={CartContainer} />
        <Route path="/user_history" component={UserHistoryContainer} />

        <Route path="/history" component={HistoryContainer} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        
        <Route exact path="/users" component={UsersContainer} />
        <Route
          exact
          path="/users/:id"
          render={({ match }) => (
            <SingleUserContainer userId={match.params.id} />
          )}
        />
      </Switch>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
