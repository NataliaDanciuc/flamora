import Image from 'next/image';

const Gallery = () => {
  return (
    <div className='mx-auto container py-14 h-full'>
      <div className='flex flex-wrap md:-m-2'>
        {/* Prima linie */}
        <div className='flex w-full md:w-1/2'>
          <div className='w-1/4 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/img1.jpg'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/4 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/img2.jpg'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/4 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/img3.jpg'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/4 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/img4.jpg'
              width={200}
              height={200}
            />
          </div>
        </div>
        {/* A doua linie */}
        <div className='flex w-full md:w-1/2'>
          <div className='w-1/4 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/img5.jpg'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/4 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/img6.jpg'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/4 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/img7.jpg'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/4 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/hero1.jpg'
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
