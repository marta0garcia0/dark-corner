import { Suspense, useState } from 'react';
import { withMenu } from '../../hocs/withMenu';

import { Carrousel } from '../../components/carrousel/Carrousel';
import { Chucky } from '../../components/action-heroes/Chucky';
import { Reapy } from '../../components/action-heroes/Reapy';
import { Freddy } from '../../components/action-heroes/Freddy';
import { Loader } from '../../utils/components';

import './DarkCorner.scss';

export const DarkCorner = withMenu(() => {
  const [tab, setTab] = useState(null);

  const tabs = [{ title: 'Chucky' }, { title: 'Reapy'}, { title: 'Freddy'}];

  return (
    <Carrousel theme="">
      <div className="Tabs_container">
        <div className="Tabs_menu">
          {tabs.map((item, index) =>
            <div className={`Tabs_menu_item ${tab === index ? 'active' : ''}`}
              onClick={() => setTab(index)} key={item.title}>{item.title}</div>)}
        </div>
        <div key={'0'} className={`Tabs_item ${0 === tab ? 'visible': 'novisible'}`}>
          <Suspense fallback={null}>
            <Chucky />
          </Suspense>
        </div>
        <div key={'1'} className={`Tabs_item ${1 === tab ? 'visible': 'novisible'}`}>
          <Suspense fallback={null}>
            <Reapy />
          </Suspense>
        </div>
        <div key={'2'} className={`Tabs_item ${2 === tab ? 'visible': 'novisible'}`}>
          <Suspense fallback={null}>
            <Freddy />
          </Suspense>
        </div>
      </div>
    </Carrousel>
  )
});

