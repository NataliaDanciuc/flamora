import { Product } from '@/models/product'
import React, { FC } from 'react'
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    product: Product;
};

const ProductCard: FC<Props> = props => {
    const {
        product: {coverImage, name, price, type, description, slug },
    } = props;


  return (
    <div className='rounded-xl w-80 mb-20 mx-auto overflow-hidden text-black'>
        <div className="h-70 overflow-hidden">
            <Image  
                src={coverImage.url}
                alt={name}
                width={300}
                height={300}
                className='img scale-animation'
                priority
            />
        </div>

        <div className="p-7 bg-white">
            <div className="flex justify-between text-xl font-semibold ">
                <p>{name}</p>
                
                <p>{price} RON</p>
            </div>

            <p className='pt-2 text-xs'>{type}</p>

            <p className='pt-3 pb-6'>{description.slice(0, 100)}...</p>
            <Link
          href={`/products/${slug.current}`}
          className='bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500'
        >
          Vezi detalii
        </Link>
        </div>

    </div>
  )
};

export default ProductCard;