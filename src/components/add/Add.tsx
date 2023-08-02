import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
// import upload from "../../utils/upload";
import { Container } from "reactstrap";
import Dropzone from "react-dropzone";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
  const [product, setProduct] = useState({
    name: "",
    // cover: "",
    price: "",
    desc: "",
    img: "",
    catCat: "",
    subCategory: "",
  });
  const [image, setImage] = useState({ array: [] });
  const handleChange = (e: any) => {
    setProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  // const handleImg = (e: any) => {
  //   setFile((prev) => {
  //     return {
  //       ...prev,
  //       [e.target.name]: e.target.value.split(","),
  //     };
  //   });
  // };

  const handleUploadClick = () => {
    if (!image) {
      return;
    }
  };

  // TEST THE API

  // const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`https://csarta.onrender.com/api/${props.slug}s`, {
        ...product,
        img: image.array,
      });
    } catch (err) {
      console.log(err);
    }
    props.setOpen(false);
  };

  const [loading, setLoading] = useState("");

  function imagePreview() {
    if (loading === "true") {
      return <h3>Cargando Imagenes...</h3>;
    }
    if (loading === "false") {
      return (
        <h3>
          {image.array.length <= 0
            ? "No hay imagenes"
            : image.array.map((item, index) => (
                <img
                  alt="Image"
                  style={{
                    width: "120px",
                    height: "100px",
                    backgroundSize: "cover",
                    padding: "15px",
                  }}
                  src={item}
                />
              ))}
        </h3>
      );
    }
  }

  const handleDrop = (files: any) => {
    const uploaders = files.map((file: any) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse,medium, gist`);
      formData.append("upload_preset", "csarta");
      formData.append("api_key", "173613772949348");
      setLoading("true");
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/dztl3rtlc/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url;
          let specificArrayInObjet = image.array;
          specificArrayInObjet.push(fileURL);
          const newObj = { ...image, specificArrayInObjet };

          setImage(newObj);
        });
    });
    axios.all(uploaders).then(() => {
      setLoading("false");
    });
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
            .filter((item) => item.field !== "_id" && item.field !== "img")
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
          {/* <input
            name="img"
            type="file"
            className="itemImg"
            placeholder="Separate the Img with commas."
            // onChange={handleImg}
            multiple
          ></input> */}
          <Container>
            <div onChange={(e: any) => setImage(e.target.value)}>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} name="img" />
                      <p>Coloca aqui tus imagenes</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            {imagePreview()}
          </Container>

          <button onClick={handleUploadClick}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
