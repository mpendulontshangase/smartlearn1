
import React, { ComponentType, useEffect } from 'react'

function WithoutTokenRedirect<P>(
    WrappedComponent: ComponentType<P>
): ComponentType<P> {
    return function WithoutTokenRedirectWrapper(props: P) {
        useEffect(() => {
            const token = localStorage.getItem('token');            

            if (!token) {
                window.location.href = "/";
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
}

export default WithoutTokenRedirect;