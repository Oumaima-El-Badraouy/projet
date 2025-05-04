import mongoose from 'mongoose';

const UsersnonConnecté = new mongoose.Schema({
   name: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const UserNONConnecté = mongoose.model('UserNONConnecté', UsersnonConnecté);
export default UserNONConnecté;
