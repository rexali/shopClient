import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
      this.logErrorToMyService=this.logErrorToMyService.bind(this);
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
    
    logErrorToMyService(err, errInfo){
        console.log(err+', '+errInfo);
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      this.logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
    
  }
