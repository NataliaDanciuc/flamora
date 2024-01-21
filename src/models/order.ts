export type Order = {
    _id: string;
    product: {
        _id:string;
        name: string;
        slug: {current: string};
        price: number;
    },
    quantity: number;
    totalPrice: number;
    discount: number;
    height?: string;
    width?: string;
    supportType?: string;
    prindereType?: string;
    unitPrice: number;
 
}