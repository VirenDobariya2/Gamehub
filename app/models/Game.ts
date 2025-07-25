import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  gameUrl: String,
  thumbnailUrl: String,
  instructions: String,
  tags: [String],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
qaText: { type: String },
});

export default mongoose.models.Game || mongoose.model('Game', GameSchema);
