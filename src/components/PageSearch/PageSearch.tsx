'use client'

import { useState } from "react";
import Search from "../Search/Search"

const PageSearch = () => {

    const [productTypeFilter, setProductTypeFilter] = useState('');
    const [searchQuery, setSearchQuery]= useState('');

    return (
        <Search 
            productTypeFilter={productTypeFilter}
            searchQuery={searchQuery}
            setProductTypeFilter={setProductTypeFilter}
            setSearchQuery={setSearchQuery}
        />
    );
};

export default PageSearch;