import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  lieu: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  }
}, {
  timestamps: true // ajoute automatiquement createdAt et updatedAt
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
