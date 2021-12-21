import React from 'react';
import { shareProduct } from '../service';

const styles = {
    beAbove: { zIndex: "1" },
    beAboveS: { zIndex: "1", right: 0 },
    imageProps: { minWidth: "auto", height: "235px" },
    mainHeight: { minHeight: "550px" },
    image:{ maxWidth: "100px", height: "100px" }
}

function Carousel({ pictures, product }) {

    return (
        <div id="demo" className="carousel slide" data-ride="carousel">
            {/* <!-- Indicators --> */}
            <ul className="carousel-indicators">
                {(() => {
                    pictures.map((_, i) => {
                        return i === 0 ?
                            (
                                <li key={i} data-target="#demo" data-slide-to={i} className="active"></li>
                            )
                            : (
                                <li key={i} data-target="#demo" data-slide-to={i}></li>
                            )
                    })
                })()
                }
            </ul>

            {/* <!-- The slideshow --> */}
            <div className="carousel-inner">
                {
                    pictures.map((picture, i) => {
                        return i === 0 ? (
                            <div className="carousel-item active">
                                <a href="#share" className="mt-1 mr-4 position-absolute d-md-none" style={styles.beAboveS} onClick={() => shareProduct(product.product.id)}><span className="fa fa-share"></span></a>
                                <img src={`uploads/${picture}`} alt={picture} style={styles.image} />
                            </div>
                        ) :
                            (
                                <div className="carousel-item">
                                    <a href="#share" className="mt-1 mr-4 position-absolute d-md-none" style={styles.beAboveS} onClick={() => shareProduct(product.product.id)}><span className="fa fa-share"></span></a>
                                    <img src={`uploads/${picture}`} alt={picture} style={styles.image} />
                                </div>
                            )
                    })
                }
            </div>

            {/* <!-- Left and right controls --> */}
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
                <span className="carousel-control-next-icon"></span>
            </a>
        </div>
    )
}
export default Carousel
