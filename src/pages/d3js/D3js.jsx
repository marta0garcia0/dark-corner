import { withMenu } from '../../hocs/withMenu';
import Animation from '../../components/animation/Animation';
import { Carrousel } from '../../components/carrousel/Carrousel';
import { ChuckyGame } from '../../components/chucky-game/ChuckyGame';

import './D3js.css';

export const D3js = withMenu(() => {
  return (
    <div className="D3js">
      <Carrousel theme="light">
        <Animation>
          <ChuckyGame />
        </Animation>
      </Carrousel>
      <Carrousel>

      </Carrousel>
    </div>
  );
});
