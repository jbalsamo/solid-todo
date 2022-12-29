/* @refresh reload */
import { ApolloClient, ApolloProvider } from "@merged/solid-apollo";
import { Suspense } from "solid-js";
import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

render(() => <App />, document.getElementById("root") as HTMLElement);
