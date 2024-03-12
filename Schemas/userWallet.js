import mongoose from "mongoose";

const userWalletSchema = new mongoose.Schema({
    
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    saldo: Number
});

export default userWalletSchema;