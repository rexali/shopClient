// "homepage": "https://rexali.github.io/home",
//   "proxy":"http://localhost:3333",


// function init(initialCount) {
//    return { count: initialCount };
// }

// function reducer(state, action) {
//    switch (action.type) {
//        case 'increment':
//            return { count: state.count + 1 };
//        case 'decrement':
//            return { count: state.count - 1 };
//        case 'reset':
//            return init(action.payload);
//        default:
//            throw new Error();
//    }
// }

// const [state, dispatch] = useReducer(reducer, 0, init);
// {state.count} <a href="#k" onClick={()=>dispatch({type:'increment',payload:0})}  >Increase</a>


/* eslint-disable no-lone-blocks */
{/* <Form onSubmit={this.getFormData}>

                        <Form.Label>Category</Form.Label>
                        {Array.from(new Set([...this.getCategory()])).map((e, i) => (
                           <div key={i} className="mb-3">
                              <Form.Check onChange={(ev) => this.getCategoryies(ev)}
                                 label={e}
                                 name="category"
                                 type="checkbox"
                                 value={e}
                                 id={`checkbox-${i}`}
                                 className="myCheck"
                              />
                           </div>
                        ))
                        }
                        <hr/>
                        <Form.Label>Price range</Form.Label>

                        <Form.Check
                           label="Lower than $20"
                           name="pricerange"
                           type="radio"
                           value="0-20"
                           id={`radio-price1`}
                           onChange={(ev) => this.getPriceRange(ev)}
                           className="myCheck"
                        />

                        <Form.Check
                           label="$20-$100"
                           name="pricerange"
                           type="radio"
                           value="20-100"
                           id={`checkbox-price2`}
                           onChange={(ev) => this.getPriceRange(ev)}
                           className="myCheck"
                        />

                        <Form.Check
                           label="$100-$200"
                           name="pricerange"
                           type="radio"
                           value="100-200"
                           id={`radio-price3`}
                           onChange={(ev) => this.getPriceRange(ev)}
                           className="myCheck"
                        />

                        <Form.Check
                           label="More than $200"
                           name="pricerange"
                           type="radio"
                           value="200-1000"
                           id={`radio-price4`}
                           onChange={(ev) => this.getPriceRange(ev)}
                           className="myCheck"
                        />
                        <div className="d-flex justify-content-between">
                           <Button variant="outline-dark" onClick={this.clearFormData}>
                              Clear
                              
                           </Button>
                           <Button variant="outline-dark" className="mr-4" onClick={(ev) => this.getFormData(ev)}>
                              Save
                           </Button>
                        </div>
                     </Form> */}

                     // const searchResult = () => {
        //     let targetElement = document.querySelector(".searchResult ul li");
        //     targetElement.addEventListener("click", (event) => {
        //         let str = event.target.textContent;
        //         // console.log(str);
        //         let searchResult = data.filter(function (element) {
        //             return element.product_name === str;
        //         })
        //         sendBackData(searchResult)

        //         // axios.get("http://localhost:3333/api/v1/products").then((res) => {
        //         //     let loadData =JSON.parse(JSON.stringify(res.data));
        //         //     let searchResult = data.filter(function (element) {
        //         //         return element.product_name === str;
        //         //     })
        //         //     sendBackData(searchResult)
        //         //     console.log(searchResult);
        //         // });
        //     });