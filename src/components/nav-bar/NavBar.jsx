import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from './../../assets/img/logo.png';

import './NavBar.scss';

const basePath = 'dark-corner/';

const pages = [
  {
    label: 'Home',
    value: basePath + '',
  },{
    label: 'D3.js',
    value: basePath + 'd3js',
  },{
    label: 'Creative',
    value: basePath + 'creative',
  },{
    label: 'Threejs',
    value: basePath + 'threejs',
  },{
    label: 'Darkcorner',
    value: basePath + 'darkcorner',
  }];

const  NavBar = () => {
  const dropdownRef = useRef();
  const navigator = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const navigateMenu = (page) => {
    setOpenMenu(false);
    navigator(`/${page}`);
  }

  useEffect(() => {
    if (dropdownRef.current) {
      if (openMenu) {
        dropdownRef.current.classList.add('visible');
      } else {
        dropdownRef.current.classList.remove('visible');
      }
    }
  }, [openMenu])
  return (
    <div className="navbar_container">
      <div className="navbar_container__logo">
        <img className="navbar_logo" src={Logo} alt="monkey business"/>
        <div className="navbar_title title">
          Dark corner
        </div>
      </div>
      <div className="navbar_container__menu">
        <div className="navbar_container__dropdown">

          {!openMenu ?
            <ion-icon name="menu" onClick={() => {setOpenMenu(true)}}></ion-icon> :
            <ion-icon name="close" onClick={() => {setOpenMenu(false)}}></ion-icon>}
        </div>
      </div>
      <div ref={dropdownRef} className="navbar_container__fixeddropdown">
        {pages.map((page) => (
          <div key={page.label} onClick={() => navigateMenu(page.value)}>{page.label}</div>
        ))}
      </div>
      <div className="navbar_container__innerdropdown">
        {pages.map((page) => (
          <div className="h3" key={page.label} onClick={() => navigateMenu(page.value)}>{page.label}</div>
        ))}
      </div>
    </div>
  );
}
export default NavBar;
