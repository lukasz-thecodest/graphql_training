import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import AuthContext from "../../context/auth-context";

const mainNavigation = () => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <header className={"main-navigation"}>
          <div className={"main-navigation__logo"}>
            <h1>Easy event</h1>
          </div>
          <nav className={"main-navigation__item"}>
            <ul>
              {!context.token && (
                <li>
                  <NavLink to={"/auth"}>Authentication</NavLink>
                </li>
              )}
              <li>
                <NavLink to={"/events"}>Events</NavLink>
              </li>
              {context.token && (
                <li>
                  <NavLink to={"/bookings"}>Bookings</NavLink>
                </li>
              )}
              {context.token ? (
                <li>
                  <button className=""
                    onClick={context.logout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li></li>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;
