import { join } from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

const alltypes = loadFilesSync(join(__dirname, "modules", "**", "*.gql"));
const allResolvers = loadFilesSync(
  join(__dirname, "modules", "**", "resolvers.ts")
);

const typeDefs = mergeTypeDefs(alltypes);
const resolvers = mergeResolvers(allResolvers);

export { typeDefs, resolvers };