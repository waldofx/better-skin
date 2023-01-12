import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

//import components
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./detailproduct.css";
import "../../hooks/useHoover.js";

const GetProductByID = gql`
    query MyQuery($id: Int!) {
        products(where: { id: { _eq: $id } }) {
            id
            name
            price
            initial_stock
            final_stock
            total
            img
            desc
            desc2
            desc3
        }
    }
`;

function DetailProduct() {
    //initial detail
    const { id } = useParams();
    const { data } = useQuery(GetProductByID, {
        variables: { id },
    });

    //setproducts at the start of render using useeffect
    const [productdata, setProducts] = useState({});
    useEffect(() => {
        if (data) {
            setProducts(data.products[0]);
        }
    }, [data]);

    console.log("datas", data);
    console.log("product data", productdata);

    return (
        <div>
            <Header />
            <div className="product">
                <div className="container">
                    <div className="product-div">
                        <div className="product-left">
                            <div className="img-product-left">
                                <img src={productdata.img} alt="img-product" style={{ width: "300px", height: "500px" }} />
                            </div>
                        </div>

                        <div className="product-right">
                            <span className="product-name"> {productdata.name} </span>
                            <span className="product-price"> Rp {productdata.price}</span>
                            <p className="product-description">{productdata.desc}</p>
                            <div className="btn-groups">
                                <button type="button" className="fas add-cart-btn">
                                    <i className="txt-btn"></i> Buy now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DetailProduct;
