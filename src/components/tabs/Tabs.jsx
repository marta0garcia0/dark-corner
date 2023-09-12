import { useState } from 'react';

import './Tabs.scss';

export default function Tabs({...props}) {
  const [tab, setTab] = useState(null);

  return (
    <div className="Tabs_container">
      <div className="Tabs_menu">
        {props.tabs.map((item, index) =>
          <div className={`Tabs_menu_item ${tab === index ? 'active' : ''}`}
            onClick={() => setTab(index)} key={item.title}>{item.title}</div>)}
      </div>
      {props.children.map((child, index) => {
        return <div key={index} className={`Tabs_item ${index === tab ? 'visible': 'novisible'}`}>
          {child}
        </div>
      }
      )}
    </div>
  );
}