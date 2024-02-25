
'use client';

import { Product } from "@/models/product"


import { FC } from 'react';
import Image from 'next/image';


import Link from 'next/link';

type Props = {
  featuredProduct: Product;
};

const FeaturedProduct: FC<Props> = props => {
  const { featuredProduct } = props;

  return (
    <section className='flex md:flex-row flex-col px-4 py-10 items-center gap-12 container mx-auto'>
      <div className='md:grid gap-8 grid-cols-1'>
        <div className='rounded-2xl overflow-hidden h-48 mb-4 md:mb-0'>
          <Image
            src={featuredProduct.coverImage.url}
            alt={featuredProduct.name}
            width={300}
            height={300}
            className='img scale-animation'
            priority
          />
        </div>
        <div className=' rounded-2xl grid grid-cols-2 gap-2 h-48'>
          {featuredProduct.images.slice(1, 3).map(image => (
            <div key={image._key} className='rounded-2xl overflow-hidden'>
              <Image
                src={image.url}
                alt={image._key}
                width={300}
                height={300}
                className='img scale-animation'
                priority
              />
            </div>
          ))}
        </div>
      </div>

      <div className='md:py-10 md:w-1/2 text-left'>
        <h3 className='font-medium max-w-md'>Preferința clienților</h3>

        <p className='font-heading mb-3'>{featuredProduct.name}</p>

        <div className='flex flex-col md:flex-row md:items-end justify-between mt-4'>
          <div className='flex mb-3 md:mb-0'>
            <div className='flex gap-3 flex-col items-center justify-center mr-4'>
              <p className='text-xs  font-medium lg:text-xl text-center'>Preț</p>
              <p className='md:font-bold flex font-medium text-lg xl:text-3xl'>
                 {featuredProduct.price} RON 
              </p>
            </div>
            
          </div>

          <Link
            href={`/products/${featuredProduct.slug.current}`}
            className='border h-fit text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-5 lg:px-7 rounded-2xl font-bold lg:text-xl'>
            Mai multe detalii
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;