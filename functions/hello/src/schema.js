import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import { getIdeas, createIdea, getAuthor } from './dynamo';

const Author = new GraphQLObjectType({
    name: "Author",
    description: "Author of the idea",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
});

const Idea = new GraphQLObjectType({
    name: 'Idea',
    description: 'Idea content',
    fields: () => ({
        id: {type: GraphQLString},
        content: {type: GraphQLString},
        author: {
            type: Author,
            resolve: ({author}) => getAuthor(author)
        }
    })
});

const Query = new GraphQLObjectType({
    name:'IdeasSchema',
    description: 'Root of the Ideas Schema',
    fields: () => ({
        ideas: new GraphQLList(Idea),
        description: 'List of submitted Ideas',
        resolve: () => getIdeas()
    })
});

const Mutation = new GraphQLObjectType({
    name: 'IdeaMutations',
    fields:{
        createIdea: {
            type: Idea,
            description: 'Create a new Idea',
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                author: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (source, args) => createIdea(args)
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;
