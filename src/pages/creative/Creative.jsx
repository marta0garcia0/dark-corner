import { withMenu } from '../../hocs/withMenu';
import Jiggle from '../../components/jiggle/Jiggle';

import './Creative.css';
import { Carrousel } from '../../components/carrousel/Carrousel';

export const Creative = withMenu(() => {
  return (
    <div className="Creative">
      <Carrousel theme="light">
        <Jiggle />
      </Carrousel>
    </div>
  );
});
