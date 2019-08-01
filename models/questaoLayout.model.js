const mongoose = require('mongoose')

const Schema = mongoose.Schema

const questaoLayoutSchema = new Schema({
  _id: { type: String, required: true },
  corpo: { type: Object, required: true }
}, {
  timestamps: true
})

const QuestaoLayout = mongoose.model('QuestaoLayout', questaoLayoutSchema, 'questaoLayout')

module.exports = QuestaoLayout
