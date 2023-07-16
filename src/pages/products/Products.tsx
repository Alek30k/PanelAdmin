import { useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
// import { products } from "../../data";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },

  {
    field: "cover",
    headerName: "Cover",
    type: "string",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.cover || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "img",
    headerName: "Img",
    type: "string",
    width: 100,
    // renderCell: (params) => {
    //   return <img src={params.row.cover || "/noavatar.png"} alt="" />;
    // },
  },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 250,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 100,
  },
  {
    field: "desc",
    type: "string",
    headerName: "Desc",
    width: 250,
  },
  {
    field: "catCat",
    headerName: "CatCat",
    type: "string",
    width: 100,
  },
  {
    field: "subCategory",
    headerName: "SubCategory",
    width: 200,
    type: "string",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allproducts"],
    queryFn: () =>
      fetch("http://localhost:8800/api/products").then((res) => res.json()),
  });

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>
      {/* <DataTable slug="products" columns={columns} rows={products} /> */}
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )}
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
