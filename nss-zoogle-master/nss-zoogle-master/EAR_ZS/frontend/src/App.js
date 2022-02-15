import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'

import withUser from './hoc/withUser'

import Menu from './components/Menu'
import Ads from './pages/Ads'
import Ad from './pages/Ad'
import MyAds from './pages/OwnedAds'
import Shelters from './pages/Shelters'
import CreateAd from './pages/CreateAd'
import CreateShelter from './pages/CreateShelter'
import EditAd from './pages/EditAd'
import EditShelter from './pages/EditShelter'
import OwnedShelters from './pages/OwnedShelters'
import Login from './pages/Login'
import Register from './pages/Register'
import ShelterDetail from './pages/ShelterDetail'
import UserDetail from './pages/UserDetail'
import EditUser from './pages/EditUser'
import JoinRequests from './pages/JoinRequests'
import Admin from './pages/Admin'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    update()
  }, [])

  const update = () => {
    setLoggedIn(Cookies.get('LOGGED_IN'))
  }

  return (
    <Router>
      <div>
        <Switch />
        <Route
          path="*"
          render={routeProps => (
            <Menu {...routeProps} loggedIn={loggedIn} updateLog={update} />
          )}
        />
        {loggedIn ? (
          <Switch>
            <Route path="/shelters" exact component={Shelters} />
            <Route path="/my-ads" exact component={MyAds} />
            <Route path="/my-shelters" exact component={OwnedShelters} />
            <Route
              path="/ads/:id"
              exact
              render={routeProps => <Ad {...routeProps} loggedIn={loggedIn} />}
            />
            <Route path="/new-ad" exact component={CreateAd} />
            <Route path="/ads/:id/edit" exact component={EditAd} />
            <Route
              path="/shelters/:shelterId"
              exact
              component={ShelterDetail}
            />
            <Route
              path="/shelters/:shelterId/new-ad"
              exact
              component={CreateAd}
            />
            <Route path="/new-shelter" exact component={CreateShelter} />
            <Route
              path="/shelters/:shelterId/edit"
              exact
              component={EditShelter}
            />
            <Route
              path="/shelters/:shelterId/requests"
              exact
              component={JoinRequests}
            />
            <Route path="/admin" exact component={Admin} />
            <Route path="/user/edit" exact component={withUser(EditUser)} />
            <Route
              path="/user"
              exact
              render={routeProps => (
                <UserDetail {...routeProps} updateLog={update} />
              )}
            />
            <Route path="/" component={Ads} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Ads} />
            <Route path="/shelters" exact component={Shelters} />
            <Route
              path="/ads/:id"
              exact
              render={routeProps => <Ad {...routeProps} loggedIn={loggedIn} />}
            />
            <Route
              path="/shelters/:shelterId"
              exact
              component={ShelterDetail}
            />
            <Route
              path="/login"
              exact
              render={routeProps => (
                <Login {...routeProps} updateLog={update} />
              )}
            />
            <Route path="/register" exact component={Register} />
            <Route
              render={routeProps => (
                <Login {...routeProps} updateLog={update} />
              )}
            />
          </Switch>
        )}
      </div>
    </Router>
  )
}

export default App
