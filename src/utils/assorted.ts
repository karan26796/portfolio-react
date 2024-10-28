// Banner images
import Banner01 from './assorted/Banner-01.webp';
import Banner02 from './assorted/Banner-02.webp';
import Banner03 from './assorted/Banner-03.webp';
import Banner04 from './assorted/Banner-04.webp';
import Banner05 from './assorted/Banner-05.webp';
import Banner06 from './assorted/Banner-06.webp';
import Banner07 from './assorted/Banner-07.webp';
// import Banner08 from './assorted/Banner-08.webp';
// import Banner09 from './assorted/Banner-09.webp';
import Banner10 from './assorted/Banner-10.webp';
// import Banner11 from './assorted/Banner-11.webp';
// import Banner12 from './assorted/Banner-12.webp';

// Aiguire images
import Aiguire01 from './assorted/aiquire-01.webp';
import Aiguire02 from './assorted/aiquire-02.webp';
import Aiguire03 from './assorted/aiquire-03.webp';
import Aiguire04 from './assorted/aiquire-04.webp';

// Frontrow images
import Frontrow01 from './assorted/frontrow-01.webp';
import Frontrow02 from './assorted/frontrow-02.webp';
import Frontrow03 from './assorted/frontrow-03.webp';
import Frontrow04 from './assorted/frontrow-04.webp';
import Frontrow05 from './assorted/frontrow-05.webp';
import Frontrow06 from './assorted/frontrow-06.webp';

// Pause images
import Pause01 from './assorted/pause-01.webp';
import Pause02 from './assorted/pause-02.webp';
import Pause03 from './assorted/pause-03.webp';

// Qohoo images
// import Qohoo01 from './assorted/qohoo-01.webp';
// import Qohoo02 from './assorted/qohoo-02.webp';
// import Qohoo03 from './assorted/qohoo-03.webp';
import Qohoo04 from './assorted/qohoo-04.webp';
import Qohoo05 from './assorted/qohoo-05.webp';
import Qohoo06 from './assorted/qohoo-06.webp';
import Qohoo07 from './assorted/qohoo-07.webp';
import Qohoo08 from './assorted/qohoo-08.webp';
// import Qohoo09 from './assorted/qohoo-09.webp';
// import Qohoo10 from './assorted/qohoo-10.webp';
// import Qohoo11 from './assorted/qohoo-11.webp';
// import Qohoo12 from './assorted/qohoo-12.webp';

// Skylark images
import Skylark01 from './assorted/skylark-01.webp';
import Skylark02 from './assorted/skylark-02.webp';
import Skylark03 from './assorted/skylark-03.webp';
import Skylark04 from './assorted/skylark-04.webp';
import Skylark05 from './assorted/skylark-05.webp';
import Skylark06 from './assorted/skylark-06.webp';
import Skylark07 from './assorted/skylark-07.webp';

// VDO.ai images
import VdoAi01 from './assorted/vdo.ai-01.webp';
import VdoAi02 from './assorted/vdo.ai-02.webp';
import VdoAi03 from './assorted/vdo.ai-03.webp';
import VdoAi04 from './assorted/vdo.ai-04.webp';
// import VdoAi05 from './assorted/vdo.ai-05.webp';
// import VdoAi06 from './assorted/vdo.ai-06.webp';
import VdoAi07 from './assorted/vdo.ai-07.webp';
import VdoAi08 from './assorted/vdo.ai-08.webp';

// Vector images
import Vector01 from './assorted/vector-01.webp';
import Vector02 from './assorted/vector-02.webp';
import Vector03 from './assorted/vector-03.webp';
import Vector04 from './assorted/vector-04.webp';
import Vector05 from './assorted/vector-05.webp';
import Vector06 from './assorted/vector-06.webp';
// import Vector07 from './assorted/vector-07.webp';
import Vector08 from './assorted/vector-08.webp';
// import Vector09 from './assorted/vector-09.webp';
// import Vector10 from './assorted/vector-10.webp';
// import Vector11 from './assorted/vector-11.webp';
// import Vector12 from './assorted/vector-12.webp';

// Export by categories
export const bannerImages = {
  Banner01, Banner04,Banner10
};

export const aiguireImages = {
  Aiguire01, Aiguire02, Aiguire03, Aiguire04
};

export const frontrowImages = {
  Frontrow01, Frontrow02, Frontrow03, Frontrow04, Frontrow05, Frontrow06
};

export const pauseImages = {
  Pause01, Pause02, Pause03
};

export const qohooImages = {
   Qohoo04, Qohoo05, Qohoo06, Qohoo07, Qohoo08
};

export const skylarkImages = {
  Skylark01, Skylark02, Skylark03, Skylark04, Skylark05, Skylark06, Skylark07
};

export const vdoAiImages = {
  VdoAi01, VdoAi02, VdoAi03, VdoAi04, VdoAi07, VdoAi08
};

export const vectorImages = {
  Vector01, Vector02, Vector03, Vector04, Vector05, Vector08
};

// Export all images in a single object
export const allImages = {
  ...bannerImages,
  ...aiguireImages,
  ...frontrowImages,
  ...pauseImages,
  ...qohooImages,
  ...skylarkImages,
  ...vdoAiImages,
  ...vectorImages
};

// Export by project for easier access
export const imagesByProject = {
  banner: bannerImages,
  aiguire: aiguireImages,
  frontrow: frontrowImages,
  pause: pauseImages,
  qohoo: qohooImages,
  skylark: skylarkImages,
  vdoAi: vdoAiImages,
  vector: vectorImages
};

export default allImages;