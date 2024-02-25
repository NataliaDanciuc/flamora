"use client";

import { getProduct } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import ShopPhotoGallery from "@/components/ShopPhotoGallery/ShopPhotoGallery";
import BuyProductCta from "@/components/BuyProductCta/BuyProductCta";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


import { getStripe } from "@/libs/stripe";

import ProductReview from "@/components/ProductReview/ProductReview";




const ProductDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;


  const [prindereType, setPrindereType] = useState('');
  const [ supportType, setSupportType] = useState('');
  const [height, setHeight]= useState(0);
  const [width, setWidth]= useState(0);
  const [quantity, setQuantity]= useState(1);
  
 
  const fetchProduct = async () => getProduct(slug);
  const { data: product, error, isLoading } = useSWR("/api/product", fetchProduct);

  if (error) throw new Error("Cannot fetch data");
  if (typeof product === "undefined" && !isLoading) {
    throw new Error("Cannot fetch data");
  }
  if (!product) return <LoadingSpinner />;

  // Funcția de callback pentru actualizarea prețului
  
  const calculateTotalPrice = () => {
    const laborCost = 15;
    const productType = product.type;
    const ringCostPerPiece = 9;
    const rejansaCostPerM = 5;
    const discountPrice = product.price - (product.price / 100) * product.discount;
  
    const MaterialCost = (height / 100) * (width / 100) * discountPrice + laborCost;
  
    let totalPrice = 0;
  
    if (productType === "perdele" || productType === "draperii") {
      if (supportType === "sina") {
        const rejansaCost = (width / 100) * rejansaCostPerM;
        const partialCost = rejansaCost + MaterialCost;
        totalPrice += partialCost;
      }
  
      if (supportType === "galerie" && prindereType === "rejansa") {
        const rejansaCost = (width / 100) * rejansaCostPerM;
        const partialCost1 = rejansaCost + MaterialCost;
        totalPrice += partialCost1;
      } else if (prindereType === "inele") {
        const numRings = Math.ceil(width / 30);
        const ringCost = numRings * ringCostPerPiece;
        const partialCost = ringCost + MaterialCost;
        totalPrice += partialCost;
      }
    }
  
    if (productType === 'accesorii') {
      const accessoryCost = discountPrice;
      totalPrice += accessoryCost * quantity;
    }
  
    const formattedTotalPrice = totalPrice.toFixed(2);
    return formattedTotalPrice;
  };
  const handleGoPayClick = async () => {
    
    const productType= product.type;
    const productSlug = product.slug.current;
    
    // Check if any required fields are missing
    if ((productType === "accesorii" && !quantity) || !productSlug) {
      return toast.error("Please fill in all required fields");
    }

    // Additional checks for other fields if needed
    if (productType === "perdele" || productType === "draperii") {
      if (!supportType) {
        return toast.error("Please select the support type");
      }

      if (supportType === "galerie" && !prindereType) {
        return toast.error("Please select the prindere type for galerie support");
      }
    }

    const stripe = await getStripe();

    try {
      const totalPrice = calculateTotalPrice();
      const { data: stripeSession } = await axios.post('/api/stripe', {
        prindereType,
        quantity,
        supportType,
        width,
        height,
        productSlug,
        totalPrice,
        unitPrice: product.price,
        discount: product.discount,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error('Payment Failed');
        }
      }
    } catch (error) {
      console.log('Error: ', error);
      toast.error('An error occured');
    }
  };

    


  return (
    <div>
      <ShopPhotoGallery photos={product.images} />

      <div className="container mx-auto mt-20 ">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <div>
              <h2 className="font-bold text-left text-lg md:text-2xl">
                {product.name}
                {product.height && (
                  <>
                    {" / "}
                    {product.height} cm
                  </>
                )}
              </h2>

              <div className="mb-11">
                <h2 className="font-bold text-xl mb-2">Descrierea Produsului</h2>
                <p>{product.description}</p>
              </div>

              <div className='shadow dark:shadow-white rounded-lg p-6'>
                <div className='items-center mb-4'>
                  <p className='md:text-lg font-semibold'>Customer Reviews</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <ProductReview productId={product._id} />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto ">
            <BuyProductCta
              discount={product.discount}
              price={product.price}
              specialNotes={product.specialNotes}
              productType={product.type}
              height={height}
              width={width}
              setHeight={setHeight}
              setWidth={setWidth}
              quantity={quantity}
              setQuantity={setQuantity}
              handleGoPayClick={handleGoPayClick}
              supportType={supportType}
              setSupportType={setSupportType}
              prindereType={prindereType}
              setPrindereType={setPrindereType} />
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;


