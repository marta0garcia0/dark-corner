import React from 'react';

import Img1 from './../assets/img/img1.svg';
import Img2 from './../assets/img/img2.svg';
import Img3 from './../assets/img/img3.svg';
import Img4 from './../assets/img/img4.svg';
import Img5 from './../assets/img/img5.svg';
import Img6 from './../assets/img/img6.svg';
import Img7 from './../assets/img/img7.svg';
import Img8 from './../assets/img/img8.svg';
import Img9 from './../assets/img/img9.svg';

export const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9];

function ImgBrowser(img) {
	return images[img-1]
}

export default ImgBrowser;
