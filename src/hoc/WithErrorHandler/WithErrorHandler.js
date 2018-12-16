import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

//global HOC for error handling

// we use the pattern of wrapping a generic component
// and all of its props for composition

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component  {

        state = {
            error: null
        }

        componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use((req) => {
                this.setState({
                    error: null
                });
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(response => response, (error) => {
                this.setState({
                    error:error
                });
               
            })
        }
        //eject old interceptors once this HOC unmounts so they do not remain in memory
        componentWillUnmount(){
            //console.log('Will Unmount',this.requestInterceptor, this.responseInterceptor )
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        //used to close the modal when one clicks on the backdrop
        errorConfirmedHandler = () => {
            this.setState({
                error:null
            })
        }

        render() {
            return(
            <Aux>
                <Modal 
                show={this.state.error}
                modalClosed={this.errorConfirmedHandler}
                >
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
            )
        }
    }
}

export default WithErrorHandler;