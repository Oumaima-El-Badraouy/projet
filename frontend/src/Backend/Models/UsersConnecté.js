import mongoose from 'mongoose';

const UsersConnecté = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    prenom: { type: String, required: true },
    password: {
        type: String,
        required: true, 
    }
   
});

const UserConnecté = mongoose.model('UserConnecté', UsersConnecté);
export default UserConnecté;
