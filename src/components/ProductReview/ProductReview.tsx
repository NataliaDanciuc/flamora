import axios from 'axios';
import { FC } from 'react';
import useSWR from 'swr';

import { Review } from '@/models/review';
import Rating from '../Rating/Rating';

const ProductReview: FC<{ productId: string }> = ({ productId }) => {
  const fetchProductReviews = async () => {
    const { data } = await axios.get<Review[]>(`/api/product-reviews/${productId}`);
    return data;
  };

  const {
    data: productReviews,
    error,
    isLoading,
  } = useSWR('/api/product-reviews', fetchProductReviews);

  if (error) throw new Error('Cannot fetch data');
  if (typeof productReviews === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');

  console.log(productReviews);

  return (
    <>
      {productReviews &&
        productReviews.map(review => (
          <div
            className='bg-gray-100 dark:bg-gray-900 p-4 rounded-lg'
            key={review._id}
          >
            <div className='font-semibold mb-2 flex'>
              <p>{review.user.name}</p>
              <div className='ml-4 flex items-center text-tertiary-light text-lg'>
                <Rating rating={review.userRating} />
              </div>
            </div>

            <p>{review.text}</p>
          </div>
        ))}
    </>
  );
};

export default ProductReview;