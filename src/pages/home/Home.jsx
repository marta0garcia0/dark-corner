import { withMenu } from '../../hocs/withMenu';
import { Carrousel } from '../../components/carrousel/Carrousel';

import './Home.scss';
import img from './../../assets/img/home_cover.jpg';

export const Home = withMenu(() => {

  return (
    <div className="Home body-container">
      <div className='title'>Welcome to Dark Corner!</div>
      <div className='text blue'>
        {'Hopefully you\'ll enjoy this experience'}
        <ion-icon size="small" name="heart" ></ion-icon>
      </div>
      
      <Carrousel>
        <div className='text gold dark'></div>
					<img  src={img} alt="Anti Berbas Sias"/>
      </Carrousel>
    </div>
  );
});
