import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
  const [product, setProduct] = useState({
    name: "",
    cover: "",
    price: "",
    desc: "",
    img: "",
    catCat: "",
    subCategory: "",
  });

  const handleChange = (e: any) => {
    setProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  // TEST THE API

  // const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //add new item
    try {
      await axios.post(`http://localhost:8800/api/${props.slug}s`, {
        ...product,
      });
    } catch (err) {
      console.log(err);

      // mutation.mutate();
      props.setOpen(false);
    }
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "_id")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input
                  onChange={handleChange}
                  type={column.type}
                  placeholder={column.field}
                  name={column.field}
                />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
