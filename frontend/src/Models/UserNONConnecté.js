import mongoose from 'mongoose';

const UsersnonConnecté = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nom: { type: String, required: true },
});

const UserNONConnecté = mongoose.model('UserNONConnecté', UsersnonConnecté);
export default UserNONConnecté;
