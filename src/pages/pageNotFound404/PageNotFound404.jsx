import { withMenu } from '../../hocs/withMenu';

import img from './../../assets/img/florona.gif';

import './PageNotFound404.scss';

export const PageNotFound404 = withMenu(() => {

  return (
    <div className="Pagenotfound body-container">
      <div>Opps! Something went wrong, page not found.</div>
      <div><img key={img} src={img} alt="something went wrong" /></div>

    </div>
  );
});
