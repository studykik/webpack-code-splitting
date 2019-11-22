import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';

const App = ({ route }) => (
    <>
        <div className="container-fluid">
            <div className="row">
                <main role="main">
                    <Suspense fallback={<div>Loading</div>}>
                        {renderRoutes(route.routes)}
                    </Suspense>
                </main>
            </div>
        </div>
    </>
);

export default App;
