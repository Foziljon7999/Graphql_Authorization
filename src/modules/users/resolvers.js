const checkLogin = require("../../graphql/checkLogin");
const { sign } = require("../../utils/jwt");
let UserModel = require("./model");
const pubsub = require("../../graphql/pubsub")
const resolvers = {
  Query: {
    getMe: async (_, __, context) => {
      try {
        checkLogin(context);

        let user = await UserModel.findById(context.user.id);

        user.id = user._id;
        delete user._id;

        return user;
      } catch (error) {
        return error.message;
      }
    },
  },

  Mutation: {
    login: async (parent, { userName, password }, context, info) => {
      let user = await UserModel.findOne({ userName, password });

      if (user) {
        let token = sign({ id: user._id });
        return token;
      } else {
        return "User not found";
      }
    },

    register: async (
      parent,
      { userName, password, fullName },
      context,
      info
    ) => {
      let user = await UserModel.create({ userName, password, fullName });
      await user.save();

      return "Successfully registered";
    },

    updateProfile: async (parent, { userName, password, fullName }, context, info) => {
      checkLogin(context);
      let id = context.user.id;
      await UserModel.findOneAndUpdate(
        { _id: id },
        { userName, password, fullName }
      );
      let users = await userModel.find()
      pubsub.publish('USER_UPDATE', {users})   
      return "Updated";
    },

    deleteAccount: async(_, __, context) => {
      checkLogin(context)

      let userId = context.user.id
      if(!userId) {
        throw new Error("User not authorization")
      }
        const deleteUser = await UserModel.findByIdAndDelete(userId)

        if(!deleteUser){
          throw new Error("User not found")
      }
      pubsub.publish('USER_DELETE', { userDelete: deleteUser });

      return "Delete Account"
    }
  },

  Subscription: {
    users: {
        subscribe: () => pubsub.asyncIterator0(["USER_UPDATE", "USER_DELETE"])
    }
}
};

module.exports = resolvers;
resolvers.js




