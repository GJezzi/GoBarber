import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
    const composer =
        process.env.NODE_ENV === 'development'
            ? compose(
                  applyMiddleware(...middlewares),
                  console.tron.createEnhancer()
              )
            : applyMiddleware(...middlewares);

    return createStore(reducers, composer);
};
