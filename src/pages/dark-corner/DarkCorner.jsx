import { withMenu } from '../../hocs/withMenu';

import Tabs from '../../components/tabs/Tabs';
import { Carrousel } from '../../components/carrousel/Carrousel';
import { Chucky } from '../../components/action-heroes/Chucky';
import { Reapy } from '../../components/action-heroes/Reapy';

import './DarkCorner.scss';



export const DarkCorner = withMenu(() => {

  const tabs = [{ title: 'Chucky' }, { title: 'Reapy'}];

  return (
    <Carrousel theme="">
      <Tabs tabs={tabs}>
        <Chucky />
        <Reapy />
      </Tabs>
    </Carrousel>
  )
});

