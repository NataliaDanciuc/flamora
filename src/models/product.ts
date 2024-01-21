type CoverImage = {
    url: string;
};

export type Image = {
  
    _key: string;
    url: string;
};

type Slug = {
    _type: string;
    current: string;

}


export type Product = {
    _id: string;
    coverImage: CoverImage;
    name: string;
    description: string;
    discount: number;
    images: Image[];
    isFeatured: boolean;
    price: number;
    slug: Slug;
    type: string;
    height:number;
    specialNotes:string;
    quantity: number;

};

export type CreateOrderDto = {
    user: string;
    product: string;
    totalPrice: number;
    discount: number;
    quantity: number;
    height: number;
    width: number;
    supportType: string;
    prindereType: string;
    unitPrice: number;
 

}



