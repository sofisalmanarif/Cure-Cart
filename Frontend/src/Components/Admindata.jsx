
export const ADMIN_DATA = [
    { photo: 'pictures/div1.png', name: 'HK Vitals', price: 500, stock: 50, action: 'Manage' },
    { photo: 'pictures/div2.png', name: 'Cetaphil Facewash', price: 300, stock: 50, action: 'Manage' },
    { photo: 'pictures/div4.png', name: 'Vicks VapoRub', price: 260, stock: 75, action: 'Manage' },
    { photo: 'pictures/div5.png', name: 'BP Machine', price: 2500, stock: 75, action: 'Manage' },
    { photo: 'pictures/div6.png', name: 'BP Control Tablets', price: 300, stock: 75, action: 'Manage' },
    { photo: 'pictures/div1.png', name: 'HK Vitals', price: 500, stock: 75, action: 'Manage' },
    { photo: 'pictures/div2.png', name: 'Cetaphil Facewash', price: 300, stock: 75, action: 'Manage' },
    
];


export const ADMIN_COLUMNS = [
    { Header: 'Photo', accessor: 'photo', Cell: ({ value }) => <img src={value} alt="Product" className="h-16 w-12" /> },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Stock', accessor: 'stock' },
    { Header: 'Action', accessor: 'action', Cell: ({ value }) => <div className="text-blue-500 font-bold bg-blue-200 w-fit rounded-md">{value}</div> }
];