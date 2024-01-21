"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, FC } from "react"

type Props = {
    productTypeFilter: string;
    searchQuery: string;
    setProductTypeFilter: (value: string) => void;
    setSearchQuery: (value: string) => void;

};

const Search: FC<Props> = ({
    productTypeFilter, 
    searchQuery, 
    setProductTypeFilter, 
    setSearchQuery
}) => {
    const router = useRouter();

    const handleProductTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setProductTypeFilter(event.target.value);
    };

    const handleSearchQueryChange = (event:ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterClick = () => {
        //Navigate to the product page
        router.push(`/products?type=${productTypeFilter}&searchQuery=${searchQuery}`);

    };

    return (
        <section className="bg-tertiary-light px-4 py-6 rounded-lg">
            <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
                <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
                    <label className="block text-sm fonst-medium mb-2 text-black">
                        Categorie
                    </label>
                    <div className="relative">
                        <select 
                            value={productTypeFilter} 
                            onChange={handleProductTypeChange} 
                            className="w-full px-4 py-2capitalize rounded leading-tight dark:bg-black focus:outline-none"
                            >
                                <option value='All'>All</option>
                                <option value='Perdele'>Perdele</option>
                                <option value='Draperii'>Draperii</option>
                                <option value='Accesorii'>Accesorii</option>
                            
                        </select>
                    </div>
                </div>
                <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
                    <label className="block text-sm font-medium mb-2 text-black">Caută</label>
                    <input 
                        type="search" 
                        id="search" 
                        placeholder="Caută..."
                        className="w-full px-4 py-3 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        />
                </div>
                <button 
                    className="btn-primary" 
                    type="button" 
                    onClick={handleFilterClick}
                    >
                        Caută
                    </button>
            </div>
        </section>
    )
}

export default Search