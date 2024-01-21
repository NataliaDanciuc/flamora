"use client";

import React, { FC } from "react";
import CountUpNumber from "../CountUpNumber/CountUpNumber";
import { section2 } from "./ServerComponent";

type Props = {
    heading1: React.ReactNode;
    section2: React.ReactNode;
};

const ClientComponent: FC<Props> = props => {
    const {heading1, section2} = props
  return (
    <section className="flex px-4 items-center gap-12 container mx-auto">
        <div className="py-10 h-full">
            {heading1}
            {/* Product description*/}

            <div className="flex justify-between mt-12">
                <div className="flex gap-3 flex-col item-center justify-between">
                <p className="text-xs lg:text-xl text-center">Perdele</p>
                <CountUpNumber duration={3000} endValue={100}/>
                </div>

                <div className="flex gap-3 flex-col item-center justify-between">
                <p className="text-xs lg:text-xl text-center">Draperii</p>
                <CountUpNumber duration={3000} endValue={100}/>
                </div>

                <div className="flex gap-3 flex-col item-center justify-between">
                <p className="text-xs lg:text-xl text-center">Accesorii</p>
                <CountUpNumber duration={3000} endValue={250}/>
                </div>
            </div>
            </div>

            {/* IMAGES */}
        {section2}

  </section>
  )
}

export default ClientComponent