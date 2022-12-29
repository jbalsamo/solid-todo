import { createQuery, gql } from "@merged/solid-apollo";
import type { Component } from "solid-js";
import styles from "./css/App.module.css";
import logo from "./logo.svg";

/**
 * Constants
 */
const countQuery = gql`
  query {
    count
  }
`;

const App: Component = () => {
  const results = createQuery(countQuery);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1 id="bigTitle">Apollo ToDo List - {results.data.count} items</h1>
      </header>
    </div>
  );
};

export default App;
