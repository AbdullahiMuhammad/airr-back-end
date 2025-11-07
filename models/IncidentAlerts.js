import mongoose from 'mongoose';

const IncidentAlertSchema = new mongoose.Schema({
  fileRef: [{String}],
  description: String,
  state: String,
  localGov: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  notifiedBranches: [{ type: mongoose.Schema.ObjectId, ref: 'Branch' }]
}, { timestamps: true });

const IncidentAlerts = mongoose.model('Incidentalert', IncidentAlertSchema);

export default IncidentAlerts;
