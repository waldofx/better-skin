import React, { useEffect, useState } from "react";

import useGetProductsByName from "../../hooks/useGetProductsByName";
import useDeleteProducts from "../../hooks/useDeleteProducts";

//import components and styles
import Header from "../../components/header";
import Footer from "../../components/footer";

function DataProduct() {
  //get products
  // ----------------- custom hook graphql -------------------------
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

  var no = 1;

  //handle edit & delete
  const { deleteProducts } = useDeleteProducts();

  function handleDelete(id) {
    return function (e) {
      if (window.confirm("Apa anda yakin ingin menghapus product ini?")) {
        deleteProducts({
          variables: {
            id: id,
          },
        });
        window.alert("Product terhapus!");
        window.location.reload(false);
      }
    };
  }

  return (
    <div>
      <Header />
      <div id="wrapper">
        <div className="row">
          <div
            className="col-2 border-right"
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
            className="col border-right mx-5"
            id="middle_section"
            style={{ minHeight: "700px" }}
          >
            {isError && <p>Something Went Wrong...</p>}
            {isLoading && <p>Now loading...</p>}
            {!isError && !isLoading && (
              <div className="table-responsive">
                <div className="mt-5">
                  <a href="/tambahDataProduct" class="btn btn-success">
                    <i class="fa fa-plus"></i> Tambah Data Product
                  </a>
                </div>
                <br></br>
                <table
                  class="table table-striped table-bordered table-hover mt-5 mb-5"
                  id="dataTables-example"
                >
                  <thead>
                    <tr className="text-center">
                      <th>No</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th width="15%">Description</th>
                      <th width="15%">Manfaat</th>
                      <th width="15%">Cara pakai</th>
                      <th>Image</th>
                      <th width="15%">Aksi</th>
                    </tr>
                  </thead>
                  {productdatas.map((productdata) => (
                    <tbody className="text-center">
                      <td>{no++}</td>
                      <td>{productdata.name}</td>
                      <td>{productdata.price}</td>
                      <td>{productdata.desc}</td>
                      <td>{productdata.desc2}</td>
                      <td>{productdata.desc3}</td>
                      <td>
                        <img
                          src={productdata.img}
                          style={{ width: "100px", height: "100px" }}
                          alt="product img"
                        />
                      </td>

                      <td>
                        <button
                          className="text-white py-2 px-2 rounded  my-4"
                          style={{ background: "red", width: "70px" }}
                          onClick={handleDelete(productdata.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tbody>
                  ))}
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DataProduct;
