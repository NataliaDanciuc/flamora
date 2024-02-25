import {groq} from "next-sanity"

export const getFeaturedProductQuery = groq`*[_type == "product"  && isFeatured == true][0] {
    _id,
    description,
    discount,
    images, 
    isFeatured,
    name,
    price, 
    slug,
    height,
    coverImage
}`;

export const getProductsQuery = groq`*[_type == "product"] {
    _id,
    coverImage,
    description,
    isFeatured,
    name,
    price, 
    slug,
    discount,
    height,
    type
   
}`

export const getProduct = groq`*[_type == "product" && slug.current == $slug][0]{
    _id,
    description,
    discount,
    images, 
    isFeatured,
    name,
    price, 
    slug,
    coverImage,
    height,
    specialNotes,
    type

}`

export const getUserOrdersQuery = groq`*[_type == 'order' && user._ref == $userId]{
    _id,
    product -> {
        _id,
        name,
        slug
    },
    quantity,
    totalPrice,
    discount

}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
}`;

export const getProductReviewsQuery = groq`*[_type == "review" && product._ref == $productId] {
    _createdAt,
    _id,
    text,
    user -> {
        name
    },
    userRating
}`;