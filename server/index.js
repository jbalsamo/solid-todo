import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";

const todoList = [
  {
    id: "1",
    desc: "Learn GraphQL",
    done: false,
  },
  {
    id: "2",
    desc: "Build a server",
    done: false,
  },
];

console.log(todoList[1]);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    todos: () => todoList,
    todo: (_, { id }) => {
      return todoList.filter((aid) => id === aid.id)[0];
    },
  },
  Mutation: {
    addTodo: (_, { desc }) => {
      let id = (todoList.length + 1).toString();
      let addItem = { id: id, desc: desc, done: false };
      todoList.push(addItem);
      return {
        code: "200",
        success: true,
        message: "Successfully added",
        todo: addItem,
      };
    },
    toggleTodo: (_, { id }) => {
      let todo = todoList.filter((aid) => id === aid.id)[0];
      todo.done = !todo.done;
      return {
        code: "200",
        success: true,
        message: "Toggled done",
        todo: todo,
      };
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
