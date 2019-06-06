import React from 'react';
import NavLayout from '../Layout/NavLayout';

export default ComposedComponent => {
    return class withNavLayout extends React.Component {
        static async getInitialProps(ctx) {
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            return pageProps;
        }

        render() {
            return (
                <NavLayout>
                    <ComposedComponent {...this.props}/>
                </NavLayout>
            )
        }
    }
}