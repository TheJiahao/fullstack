import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
