const mongoose = require("mongoose");
const hobbySchema = require("./model")
const pubsub = require("../../graphql/pubsub");

const resolvers = {
    Query: {
        hobbies: async () => {
            return await hobbySchema.find().populate('user_id')
        },
    },

    Mutation: {
        addHobby: async (_, { name, user_id }) => {
            if(!mongoose.Types.ObjectId.isValid(user_id)) {
                throw new Error("Invalid ID")
            }
                
        
            let hobby = await hobbySchema.create({ name, user_id });
            await hobby.save();
            pubsub.publish("HOBBY_CREATE", { hobbyCreated: hobby })
      
            return hobby
          },

        updateHobby: async (_, { id, name, user_id }) => {
            if(!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid ID")
            }
            let hobby = await hobbySchema.findOneAndUpdate(
              {_id: id},
              { name, user_id },
              {new: true}
            );
            pubsub.publish("HOBBY_UPDATE", { hobbyUpdated: hobby })
            return hobby;
          },

        deleteHobby: async (_, { id }) => {
            if(!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid ID")
            };
         let hobby = await hobbySchema.findOneAndDelete(id);
             if(!hobby){
                throw new Error("Hobby not found")
             }
       
        pubsub.publish("HOBBY_DELETE", {hobbyDeleted: hobby})
            return "Deleted"
          },
        },
    
        Subscription: {
            hobbies: {
                subscribe: () => pubsub.asyncIterator0(["HOBBY_CREATE", "HOBBY_UPDATE", "HOBBY_DELETE"])
            }
        }
}


module.exports = resolvers