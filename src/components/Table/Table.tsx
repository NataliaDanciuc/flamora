'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import { Order } from '@/models/order';
import order from '../../../schemas/order';
import product from '../../../schemas/product';

type Props = {
  orderDetails: Order[];
  setProductId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ orderDetails, setProductId, toggleRatingModal }) => {
  const router = useRouter();

  return (
    <div className='overflow-x-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th className='px-6 py-3'>Product name</th>
            {/* <th className='px-6 py-3'>Unit Price</th> */}
            <th className='px-6 py-3'>Price</th>
            <th className='px-6 py-3'>Discount %</th>
            <th className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map(order => (
            <tr
              key={order._id}
              className='bg-white border-b hover:bg-gray-50'
            >
              <th
                onClick={() =>
                  router.push(`/products/${order.product.slug.current}`)
                }
                className='px-6 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap'
              >
                {order.product.name}
              </th>
              {/* <td className='px-6 py-4'>{order.unitPrice}</td> */}
              <td className='px-6 py-4'>{order.totalPrice}</td>
              <td className='px-6 py-4'>{order.discount} %</td>
              
              <td className='px-6 py-4'>
                <button
                  onClick={() => {
                    setProductId(order.product._id);
                    toggleRatingModal()
                  }}
                  className='font-medium text-blue-600 hover:underline'
                >
                  Rate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;