import Link from "next/link";
import {BsFillSendFill, BsTelephoneOutbound} from "react-icons/bs";
import {BiMessageDetail} from "react-icons/bi";

function Footer() {
  return (
    <footer className="mt-16">
        <div className="cintainer mx-auto px-4">
            <Link href="/" className="font-black text-tertiary-dark">
                Flamora
            </Link>
            <h4 className="font-semibold text-[40px] py-6">Contact</h4>
            <div className="flex flex-wrap gap-16 items-center justify-between">
                <div className="flex-1">
                    <p>Strada Republicii nr. 35 Vișeu de Sus</p>
                    <div className="flex item-center py-4">
                        <BsFillSendFill/>
                        <p className="ml-2">Flamora</p>
                    </div>
                    <div className="flex item-center ">
                        <BsTelephoneOutbound/>
                        <p className="ml-2">0751234567</p>
                    </div>
                    <div className="flex item-center pt-4">
                        <BiMessageDetail/>
                        <p className="ml-2">flamora.ecommerce@gmail.com</p>
                    </div>
                </div>

                <div className="flex-1 md:text-left">
                    <p className="pb-4">Our Story</p>
                    <p className="pb-4">Get in touch</p>
                    <p className="pb-4">Our privacy commitment</p>
                    <p className="pb-4">Our Terms of service</p>
                    <p >Customer Assistance</p>
                </div>

                
            </div>
        </div>

        <div className="bg-tertiary-light h-10 md:h-[70px] mt16 w-full bottom-0"></div>
    </footer>
  )
}

export default Footer