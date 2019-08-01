const mongoose = require('mongoose')

const Schema = mongoose.Schema

const questaoSchema = new Schema({
  _id: { type: String, required: true },
  materia: { type: String, required: true },
  assunto: { type: String, required: true },
  vestibular: { type: String, required: true },
  gabarito: { type: String, required: true },
  ranking: { type: String },
  stats: { type: Object, required: true }
}, {
  timestamps: true
})

const Questao = mongoose.model('Questao', questaoSchema, 'questao')

module.exports = Questao
