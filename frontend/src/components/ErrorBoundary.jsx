import { Component } from "react";
import styled from 'styled-components'
 
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
 
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
    };
  }
 
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like AppSignal
    // logErrorToMyService(error, errorInfo);
  }
 
  render() {
    const { hasError, error } = this.state;
 
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Styles>
          <h1>Oops, something went wrong 😭</h1>
 
          {error.message && <div>{error.message}</div>}
        </Styles>
      );
    }
 
    return this.props.children;
  }
}

const Styles = styled.div`
    padding-inline: 20px;
    padding-block: 20px;
`
export default ErrorBoundary;