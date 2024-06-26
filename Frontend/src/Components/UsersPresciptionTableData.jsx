import { Link,  } from "react-router-dom";

export const USER_PREC_DATA = [
  {
    photo: "../../../pictures/div1.png",
    id: "saddfdslman",
    
    date: "21-7-21",
    status: "Delivered",
    action: <Link to="/admin/products/:id">Manage</Link>,
  },
   {
    photo: "../../../pictures/div1.png",
    id: "saljdhgashgddghgman",
    date: "21-7-21",
    status: "order.status",
    action: <Link to="/admin/products/:id">Manage</Link>,
  },
];

export const USER_PREC_COLUMNS = [
  {
    Header: "Photo",
    accessor: "photo",
    Cell: ({ value }) => (
      <img src={value} alt="Product" className="h-14 w-12" />
    ),
  },
  {
    Header: "Order ID",
    accessor: "id",
    Cell: ({ value }) => <p className="w-[100px]">{value}</p>,
  },
    { Header: "Date", accessor: "date" },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <div
        className={`${
          value === "Shipped"
            ? "text-red-500 bg-red-100  border-red-400"
            : value === "Delivered"
            ? "text-green-400 bg-green-100  border-green-400"
            : "text-yellow-600 bg-yellow-100  border-yellow-400"
        } px-2 text-md  py-1 border-2 rounded-lg text-center`}
      >
        {value}
      </div>
    ),
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ value }) => (
      <div className="text-blue-500  px-2 text-sm font-extralight py-1 bg-blue-200 w-fit rounded-md">
        {value}
      </div>
    ),
  },
];
