import React, { Component } from "react";
import { Col } from "react-bootstrap";
import HomeFooter from "./HomeFooter";
import Pagination from "react-js-pagination"
import Row from "react-bootstrap/Row";
import HomeProducts from "./HomeProducts";
import HomeHeader from "./HomeHeader";
import ModalFilter from "./ModalFilter";
import HomeSorting from "./HomeSorting";
import Spinner from "../common/Spinner";
import HomeSidebar from "./HomeSidebar";
import HomeSearch from "./HomeSearch";
import HomeMenu from "./HomeMenu";
import { AuthButton } from "../App";
import { appContext } from "../AppProvider";
import axios from "axios";

class Home extends Component {

   static contextType = appContext;

   constructor(props) {
      super(props)
      this.state = {
         initData: [],
         data: [],
         totalItemCounts: 0,
         activePage: 1,
         isLoading: true
      };

      this.receivedData = this.receivedData.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
   }

   filterPrev = (index) => {
      let newData = this.state.initData.filter((_, i) => {
         return i >= ((index * 6) - 6) && i < (index * 6);
      });
      return newData;
   }

   handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({
         activePage: pageNumber,
         data: [...this.filterPrev(pageNumber)]
      })
   }

   receivedData(x) {
      this.setState({ data: x, initData: x })
   }

   sendBackData = (x) => {
      this.setState({ data: x })
   }

   fetchData = async () => {
      // get jwt and csrf tokens
      this.context.getJwt();
      this.context.getCsrfToken();

      try {
         let { data } = await axios.get("/products/product/read");
         this.context.setData(data);
         this.setState({
            data: data,
            initData: data,
            totalItemCounts: data.length
         });
      } catch (error) {
         console.warn(error);
      } finally {
         this.setState({ isLoading: false, })
      }
   }

   async componentDidMount() {
      this.fetchData();
   }

   render() {
      const styles = { mainHeight: { minHeight: "550px" } };

      const { isLoading, data, activePage, totalItemCounts } = this.state

      if (isLoading) {
         return <Spinner />
      }

      return (
         <div>
            <appContext.Consumer >
               {({ state }) => <HomeHeader sendBackData={this.sendBackData} cartData={state.cartData} />}
            </appContext.Consumer>
            <br /><br /><div className="container"><AuthButton /></div>
            <HomeSearch sendBackData={this.sendBackData} />
            <HomeMenu sendBackData={this.sendBackData} />
            <main style={styles.mainHeight} className="container">
               <Row>
                  <div className="d-flex justify-content-between">
                     <h5 className="m-2 p-2" style={{ fontSize: "12px", opacity: '0.9' }}>Products</h5>
                     <HomeSorting receivedData={this.receivedData} />
                     <ModalFilter receivedData={this.receivedData} />
                  </div>
               </Row>
               <Row>
                  <Col md={3} className="d-none d-lg-block"><HomeSidebar receivedData={this.receivedData} /></Col>
                  <Col>
                     <Row>
                        {data?.length ?
                           <HomeProducts products={data} updateCart={this.updateCart} /> : <Spinner />
                        }
                     </Row>
                  </Col>
               </Row>
            </main>
            <div className="d-flex justify-content-center">
               <Pagination
                  activePage={activePage}
                  itemsCountPerPage={6}
                  totalItemsCount={totalItemCounts}
                  pageRangeDisplayed={4}
                  itemClass="page-item"
                  linkClass="page-link"
                  onChange={this.handlePageChange.bind(this)}
               />
            </div>
            <HomeFooter />
         </div>
      );
   }
}

export default Home;