import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    categoria: String,
    tipo: String,
    valor: Number,
    descricao: {
        type: String,
        maxlength: 300
    }
});

export default userAccount;