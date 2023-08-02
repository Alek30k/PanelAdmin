import { useState } from "react";
import "./products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
// import { products } from "../../data";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 50 },

  {
    field: "img",
    headerName: "Img",
    type: "string",
    width: 60,
    renderCell: (params) => {
      return <img src={params.row.img[0] || "/noavatar.png"} alt="" />;
    },
  },

  {
    field: "name",
    type: "string",
    headerName: "Name Product",
    width: 150,
  },
  {
    field: "seccion",
    type: "string",
    headerName: "Sección",
    width: 100,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 60,
  },
  {
    field: "discount",
    type: "string",
    headerName: "Discount",
    width: 60,
  },
  {
    field: "desc",
    type: "string",
    headerName: "Description",
    width: 300,
  },
  {
    field: "subCategory",
    headerName: "SubCategory",
    width: 200,
    type: "string",
  },
  {
    field: "catCat",
    headerName: "CatCat",
    type: "string",
    width: 100,
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allproducts"],
    queryFn: () =>
      fetch("https://csarta.onrender.com/api/products").then((res) =>
        res.json()
      ),
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
