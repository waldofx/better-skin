import React, { useEffect, useState } from "react";

import useGetProductsByName from "../../hooks/useGetProductsByName";
import useInsertProducts from "../../hooks/useInsertProducts";

//import components and styles
import Header from "../../components/header";
import Footer from "../../components/footer";

function TambahDataProduct() {
  const { dataByName, loadingDataByName, errorDataByName } =
    useGetProductsByName();

  //setproducts at the start of render using useeffect
  const [productdatas, setProducts] = useState([]);
  useEffect(() => {
    if (dataByName) {
      setProducts(dataByName.products);
    }
  }, [dataByName]);

  //error + loading
  const isError = errorDataByName;
  const isLoading = loadingDataByName;

  console.log("Product data:", productdatas);

  //insert products
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    initial_stock: 0,
    final_stock: 0,
    total: 0,
    img: "",
    desc: "",
  });

  const { insertProducts } = useInsertProducts();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Data submitted: ", formData);

    if (formData.name === "" || formData.price === 0) {
      alert("Data belum lengkap!");
    } else {
      insertProducts({
        variables: {
          object: {
            name: formData.name,
            price: formData.price,
            initial_stock: formData.initial_stock,
            final_stock: formData.final_stock,
            total: formData.total,
            img: formData.img,
            desc: formData.desc,
            desc2: formData.desc2,
            desc3: formData.desc3,
          },
        },
      });
      alert("Data berhasil dikirim ke database!");
    }
  }

  return (
    <div>
      <Header />
      <div id="wrapper">
        <div className="row">
          <div
            className="col-1 border-right"
            style={{ background: "#37474F", width: "252px" }}
          >
            <div
              className="sidebar-header"
              style={{ backgroundColor: "#263238", width: "240px" }}
            >
              <div className="d-flex flex-column text-center  py-5">
                <header className="text-white" style={{ fontWeight: "bold" }}>
                  Admin Dashboard
                </header>
              </div>
            </div>
            <div className="sidebar" style={{ background: "#37474F" }}>
              <ul>
                <li>
                  <a href="/dataPengguna">Data pengguna</a>
                </li>
                <li>
                  <a href="/dataProduct">Data product</a>
                </li>
                <li>
                  <a href="/dataPembayaran">Data pembayaran</a>
                </li>
                <li>
                  <a href="/dataPengiriman">Data pengiriman</a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col border-right mx-5 my-5"
            id="middle_section"
            style={{ minHeight: "700px" }}
          >
            {" "}
            <form
              className="row justify-content-center"
              onSubmit={handleSubmit}
              action=""
            >
              <div className="row justify-content-md-center">
                <div className="col-md-4">
                  <div className="card p-2" id="card_register">
                    <div className="card-body ">
                      <div className="form-group p-2">
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Nama product"
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group p-2">
                        <label>Price</label>
                        <input
                          name="price"
                          type="text"
                          placeholder="Rp. 10000"
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group p-2">
                        <label>Description</label>
                        <textarea
                          name="desc"
                          type="test"
                          placeholder="Deskripsi"
                          className="form-control"
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="form-group p-2">
                        <label>Manfaat</label>
                        <textarea
                          name="desc2"
                          type="test"
                          placeholder="Deskripsi"
                          className="form-control"
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="form-group p-2">
                        <label>Cara Pakai</label>
                        <textarea
                          name="desc3"
                          type="test"
                          placeholder="Deskripsi"
                          className="form-control"
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="form-group p-2">
                        <label>Image</label>
                        <input
                          name="img"
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <button
                      class="btn btn-danger mt-2 mb-3"
                      type="submit"
                      id="btn_register"
                      style={{ color: "black" }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TambahDataProduct;
