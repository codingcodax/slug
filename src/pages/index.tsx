import { type NextPage } from 'next';
import Image from 'next/image';

import { Hero } from '~/components/pages/home';

import HeroImage from '../../public/_static/images/slug-preview-mockup.png';

const Home: NextPage = () => {
  return (
    <div className='mx-auto w-full max-w-6xl'>
      <Hero />

      <div className='mt-24'>
        <Image
          alt='dashboard page preview from slug as mockup'
          src={HeroImage}
        />
      </div>
    </div>
  );
};

export default Home;
