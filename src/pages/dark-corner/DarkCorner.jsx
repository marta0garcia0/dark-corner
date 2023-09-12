import { withMenu } from '../../hocs/withMenu';

import Tabs from '../../components/tabs/Tabs';
import { Carrousel } from '../../components/carrousel/Carrousel';
import { Chucky } from '../../components/action-heroes/Chucky';
import { Reapy } from '../../components/action-heroes/Reapy';
import { Freddy } from '../../components/action-heroes/Freddy';

import './DarkCorner.scss';



export const DarkCorner = withMenu(() => {

  const tabs = [{ title: 'Chucky' }, { title: 'Reapy'}, { title: 'Freddy'}];

  return (
    <Carrousel theme="">
      <Tabs tabs={tabs}>
        <Chucky />
        <Reapy />
        <Freddy />
      </Tabs>
    </Carrousel>
  )
});

