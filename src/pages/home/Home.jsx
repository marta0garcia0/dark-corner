import { withMenu } from '../../hocs/withMenu';
import { Carrousel } from '../../components/carrousel/Carrousel';

import './Home.scss';
import img from './../../assets/img/gerba_sia_killer.jpeg';

export const Home = withMenu(() => {

  return (
    <div className="Home body-container">
      <div className='title'>Hell-o! Welcome to Dark Corner!</div>
      <div className='text blue'>
        {'Hopefully you\'ll enjoy this experience'}
        <ion-icon size="small" name="heart" ></ion-icon>
      </div>
      
      <Carrousel>
        <div className='text gold dark'>Just a little brief of what you&apos;ll find around:</div>
					<img  src={img} alt="Anti Berbas Sias"/>
      </Carrousel>
    </div>
  );
});
