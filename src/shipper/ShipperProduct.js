import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShipperEditForm from "./ShipperEditForm";

function ShipperProduct(props) {
    let [data, setData] = useState([]);
    let [show, setShow] = useState(true);
    const styles = { mainHeight: { minHeight: "550px" } };

    // const viewProduct=(id)=>{
    //  window.location.href="/detail"+id 
    // }
    
    const removeProduct = (id)=>{
        import("axios").then((axios) => {
            axios.get('http://localhost:3000/mydata.json',{
                body:{product_id: id}
            }).then(function (response) {
                let loadData = JSON.stringify(response.data);
                setData(JSON.parse(loadData).filter((e) => {
                    return Number(e.id) === id;
                }));
            }).catch(function (error) {
                console.log(error);
            });
        });
    }
    const editProduct = ()=>{
        setShow(false);
    }

    const updateAfterPost = ()=>{
        setShow(true);
    }

    const shareProduct = async (id)=>{
            const dataToShare = {
                title: 'kanimall.com',
                text: 'Check out this product you may like it.',
                url: window.location.origin + '/detail/'+id
            }
            if (navigator.share) {
                try {
                    await navigator.share(dataToShare);
                } catch (error) {
                    console.log(error);
                }
            }
        }


    useEffect(() => {
        const fetchMeData = (pid) => {
            import("axios").then((axios) => {
                axios.get('http://localhost:3000/mydata.json').then(function (response) {
                    let loadData = JSON.stringify(response.data);
                    setData(JSON.parse(loadData).filter((e) => {
                        return Number(e.id) === pid;
                    }));
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }

        fetchMeData(Number(2));
    },[]);

    return (
        <div>
            <main style={styles.mainHeight} className="container">
                {show && data.map((product, i) => {
                    return (
                        <div className="card my-3 shadow-none" key={i} >
                            <p className="d-flex justify-content-around">
                                <Link 
                                className="btn btn-outline-success" 
                                to={{
                                    pathname:`/detail/${product.id}`,
                                    state: product
                                }}
                                ><span className="fa fa-eye"></span></Link>
                                <button className="btn btn-outline-info" onClick={()=>shareProduct(product.id)}><span className="fa fa-share"></span></button>
                            </p>
                            <div>
                                <i className="bg-white position-absolute" style={{ zIndex: "2" }} >{product.bestseller ? 'Best Seller' : ''} </i>
                                <img style={{ minWidth: "auto", height: "235px" }} className="cardImg-top img-fluid d-block mx-auto" src={'/' + product.image.src ? product.image.src : './logo192.png'} alt={product.image.alt ? product.image.alt : product.name} />
                            </div>
                            <div className="card-body">
                                <p>{product.category ? product.category : ''}</p>
                                <p>
                                    <strong>{product.name ? product.name : ''}</strong>
                                </p>
                                <p>
                                    {product.currency ? product.currency : ''}{product.price ? product.price : ''}
                                </p>
                                <p className="d-flex justify-content-around">
                                    <button className="btn btn-outline-success" onClick={()=>removeProduct(product.id)}><span className="fa fa-trash"></span></button>
                                    <button className="btn btn-outline-info" onClick={()=>editProduct(product.id)}><span className="fa fa-edit"></span></button>
                                </p>
                            </div>
                        </div>
                    );
                })}
                {!show && <ShipperEditForm data ={data} updateAfterPost={updateAfterPost} />}
            </main>
        </div>
    );
}


export default ShipperProduct;
