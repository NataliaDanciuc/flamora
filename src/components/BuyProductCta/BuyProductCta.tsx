"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";




type Props = {
  price: number;
  discount: number;
  specialNotes: string;
  productType: string;
  supportType: string;
  setSupportType: Dispatch<SetStateAction<string>>;
  prindereType: string;
  setPrindereType: Dispatch<SetStateAction<string>>;
  setHeight: Dispatch<SetStateAction<number>>;
  height: number;
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  handleGoPayClick: () => void;

  
 
};


const BuyProductCta: FC<Props> = (props) => {
  const { 
    price, 
    discount, 
    specialNotes, 
    productType,
    supportType,
    setSupportType,
    prindereType,
    setPrindereType,
    height,
    setHeight,
    width,
    setWidth,
    quantity,
    setQuantity,
    handleGoPayClick
    
   } = props;
  
  const [laborCost] = useState(15);

  const ringCostPerPiece = 9;
  const rejansaCostPerM = 5;
 

  const discountPrice = price - (price / 100) * discount;
 

  const calculateTotalPrice = () => {
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
  

  return (
    <div className="px-7 py-6">
      <h3>
        <span className={`${discount ? "text-gray-400" : ""} font-bold text-xl`}>
          {price} RON
        </span>
        {discount ? (
          <span className="font-bold text-xl">
            {' '} | discount {discount}%. Acum{' '}
            <span className="text-tertiary-dark">{discountPrice} RON</span>
          </span>
        ) : (
          ''
        )}
      </h3>

      <div className="w-full border-b-2 border-b-secondary my-2" />

      <h4 className="my-8">{specialNotes}</h4>

      {/* Conditionally render the form based on product type */}
      {productType === "perdele" || productType === "draperii" ? (
        <form>
            <div>
          
                <label className="font-bold mt-2">Tipul Suportului:</label>
                <select value={supportType} onChange={e=>setSupportType(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="sina">Sina</option>
                    <option value="galerie">Galerie</option>
                </select>
                </div>

                {supportType === "galerie" ? (
                    <div className="m-x-1">
                        <label className="font-bold mt-2 ">Tipul Prinderii:</label>
                        <select value={prindereType} onChange={e=>setPrindereType(e.target.value)} className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'>
                            <option value="">Select...</option>
                            <option value="inele">Inele</option>
                            <option value="rejansa">Rejansa</option>
                        </select>
                    </div>
                    ) : null
                }

                <div>

                <label className="font-bold mt-2">Latime cm:</label>
                <input
                    type="text"
                    value={width}
                    onChange={e => setWidth(+e.target.value)}
                    placeholder=" Introduce-ti latimea "
                    className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
                />
                </div>
                <div>
                <label className="font-bold mt-2">Inaltime cm:</label>
                <input
                    type="text"
                    value= {height}
                    onChange={e => setHeight(+e.target.value)}
                    placeholder=" Introduce-ti inaltimea "
                    className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary'
                />
                </div>


                
        </form>
) : null}
        {productType === 'accesorii' && (
            <><label className="font-bold mt-2">Cantitate:</label><input
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(+e.target.value)}
                  min={0}
                  className='w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary' /></>
            )}

            {/* <button className="font-bold mt-2 " type="button" onClick={() => calculateTotalPrice()}>
            Calculeaza Pret Total
            </button>
         */}
     

      {/* Display the total price */}
      <p className="text-tertiary-dark text-xl mt-4 ">
        Prețul total: {calculateTotalPrice()} RON
      </p>
      <button 
        onClick={handleGoPayClick}
        
        className='btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed' >
        Continua catre plata
      </button>
    </div>
  );
};

export default BuyProductCta;
