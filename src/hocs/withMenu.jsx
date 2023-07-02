import NavBar from '../components/nav-bar/NavBar';

// eslint-disable-next-line react/display-name
export const withMenu = (Component) => (props) => (
  <div>
    <NavBar />
    <Component {...props} />
  </div>
);
