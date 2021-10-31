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

class Home extends Component {

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

   static contextType=appContext;

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

   fetchData = async() => {

      const url = '/products/product/read';
      fetch(
         url,
         {
            mode: 'cors',
            method: 'get'
         }
      ).then((result) => result.json())
         .then((result) => {
            this.setState({
               data: result,
               initData: result,
               totalItemCounts: result.length
            });
         })
         .catch((error) => { console.log(error); })
         .finally(() => {
            this.setState({ isLoading: false, })
         })
   }

   componentDidMount() {
      this.fetchData();
      console.log(this.props.location)
   }

   render() {
      const styles = { mainHeight: { minHeight: "550px" } };

      const { isLoading } = this.state

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
                        {this.state.data.length ?
                           <HomeProducts products={this.state.data} updateCart={this.updateCart} /> : <Spinner />
                        }
                     </Row>
                  </Col>
               </Row>
            </main>
            <div className="d-flex justify-content-center">
               <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={6}
                  totalItemsCount={this.state.totalItemCounts}
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