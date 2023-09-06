const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // Check if the user is authenticated through context (you need to implement this)
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
      return context.user;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to save a book');
      }

      const { bookData } = args;
      const user = context.user;
      // Logic to save a book to the user's profile
      // You'll need to implement this part based on your data structure

      // After saving the book, return the updated user object
      return updatedUser;
    },
    removeBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to remove a book');
      }

      const { bookId } = args;
      const user = context.user;

      // Logic to remove a book from the user's profile
      // You'll need to implement this part based on your data structure

      // After removing the book, return the updated user object
      return updatedUser;
    },
  },
};

module.exports = resolvers;