import 'bootstrap/dist/css/bootstrap.min.css';

const Featured = (props) => {
   const { data, index, addToCart } = props;
   return (
      <div className="card shadow-none border-0" style={{marginTop:"60px"}}>
         <div className="d-flex justify-content-between border-0">
            <h4 className="mb-1">{data.name ? data.name : 'my picture'}</h4>
            <button className="btn btn-sm btn-dark d-none d-lg-block mb-1" onClick={() => addToCart(index)} >Add to Cart</button>
         </div>
         <div>
            <span className="bg-white position-absolute" style={{zIndex:"2", marginTop:"210px"}}>{data.featured ? 'Photo of the day' : ''}</span>
            <img src={data.image.src ? data.image.src : './logo192.png'} className="card-img-top img-fluid d-block mx-auto" style={{minWidth:"100%", height:"235px"}} alt={data.image.alt ? data.image.alt : data.name} />
         </div>
         <div className="card-body">
            <div className="row">
               <button className="btn btn-dark btn-block mt-3 d-lg-none"  onClick={() => addToCart(index)} >Add to Cart</button>
            </div>
            <div className="row">
               <div className="col-md-6">
                  <h4 className="mt-3 mb-3">About {" "} {data.name ? data.name : 'my name'}</h4>
                  <p className="card-text" style={{fontSize:"16px"}}>
                     {!data.details.description? data.details.description : 'Good product'}
                  </p>
               </div>

               <div className="col-md-6">
                  <div className="row">
                     <div className="col-12">
                     <h4 className="mt-3 mb-3">People also buy</h4>
                     <p>
                        {data.details.recommendations.map((el, i) => {
                           return <img key={i} style={{ width: "70px", height: "70px" }}  src={el.src ? el.src : ' '} className="img-fluid d-inline m-2" alt={el.alt ? el.alt : ''} />
                        })}
                     </p>
                     </div>

                     <div className="row">
                        <div className="col-12">
                        <h4 className="mt-3 mb-3">Detail</h4>
                        <p style={{fontSize:"14px"}}>
                           Dimension: {" "}{data.details.dimensions.width} {" X "} {data.details.dimensions.height}
                        </p>

                        <p style={{fontSize:"14px"}}>
                           Size: {" "}{data.details.size} {" mb"}
                        </p>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

const HomeFeatured = (props) => {
   return props.products.map((prod, index) => {
      return <Featured key={index} data={prod} index={index} addToCart={props.addToCart} detailPage={props.detailPage} />
   });
};

export default HomeFeatured;

