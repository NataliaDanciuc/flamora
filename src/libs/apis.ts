import { CreateOrderDto, Product } from "@/models/product";
import sanityClient from "./sanity";

import * as queries from "./sanityQueries";
import axios from "axios";
import { Order } from "@/models/order";
import { CreateReviewDto, Review, UpdateReviewDto } from "@/models/review";

export async function getFeaturedProduct(){
    const result = await sanityClient.fetch<Product>(
        queries.getFeaturedProductQuery, 
        {},
        {cache: 'no-cache'}
    );

    return result;
};

export async function getProducts() {
    const result = await sanityClient.fetch(
        queries.getProductsQuery,
         {},
         {cache: 'no-cache'});
    return result;
    
};

export async function getProduct(slug: string) {
  const result = await sanityClient.fetch<Product>(
    queries.getProduct, 
    {slug},
    {cache: 'no-cache'}
    );
    return result;
}

export const createOrder = async ({
  user, 
  product,  
  totalPrice, 
  discount, 
  quantity,
  height,
  width,
  supportType,
  prindereType,
  unitPrice 
}: CreateOrderDto) => {
      const mutation = {
          mutations: [
              {
                  create: {
                      _type: "order",
                      user: { _type: "reference", _ref: user },
                      product: { _type: "reference", _ref: product },
                      totalPrice,
                      discount,
                      quantity,
                      height,
                      width,
                      supportType,
                      prindereType,
                      unitPrice 
                  },
              },
          ],
      };

      const { data } = await axios.post(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        mutation,
        { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
      );
    
      return data;
  };

export  async function getUserOrders(userId: string){
    const result= await sanityClient.fetch<Order>(queries.getUserOrdersQuery , 
    {userId}, 
    {cache: 'no-cache'}
    );

    return result;
}


export async function getUserData(userId: string){
    const result = await sanityClient.fetch(
        queries.getUserDataQuery ,
        {userId},
        {cache: 'no-cache'}
        );
    return result;
}

export async function checkReviewExists(
    userId: string,
    productId: string
  ): Promise<null | { _id: string }> {
    const query = `*[_type == 'review' && user._ref == $userId && product._ref == $productId][0] {
      _id
    }`;
  
    const params = {
      userId,
      productId,
    };
  
    const result = await sanityClient.fetch(query, params);
  
    return result ? result : null;
  }
  
  export const updateReview = async ({
    reviewId,
    reviewText,
    userRating,
  }: UpdateReviewDto) => {
    const mutation = {
      mutations: [
        {
          patch: {
            id: reviewId,
            set: {
              text: reviewText,
              userRating,
            },
          },
        },
      ],
    };
  
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
    );
  
    return data;
  };
  
  export const createReview = async ({
    productId,
    reviewText,
    userId,
    userRating,
  }: CreateReviewDto) => {
    const mutation = {
      mutations: [
        {
          create: {
            _type: 'review',
            user: {
              _type: 'reference',
              _ref: userId,
            },
            product: {
              _type: 'reference',
              _ref: productId,
            },
            userRating,
            text: reviewText,
          },
        },
      ],
    };
  
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
    );
  
    return data;
  };
  
  export async function getProductReviews(productId: string) {
    const result = await sanityClient.fetch<Review[]>(
      queries.getProductReviewsQuery,
      {
        productId,
      },
      { cache: 'no-cache' }
    );
  
    return result;
  }