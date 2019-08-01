// Importando
const fs = require('fs')
const mongoose = require('mongoose')

// Declarando variaveis
const cluster = require('./keys').mongoURI
const dbQuestoes = require('./keys').dbQuestoes
const path = 'questoesTeste'
const Questao = require('./models/questao.model')
const QuestaoLayout = require('./models/questaoLayout.model')

// Conectar com o banco de dados
mongoose.connect(cluster + dbQuestoes, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('Conexão com o mongodb atlas feita com sucesso!')
})

// Lendo pasta que contem as questoes e para cada arquivo executando uam tarefa
fs.readdirSync(path).forEach((item) => {
  // Lê o dado e passa ele para json
  var data = fs.readFileSync(path + '/' + item)
  var corpo = JSON.parse(data)

  // Separa todos os dados do json necessário para mandar para o banco de dados
  // Materia
  var materia = corpo.Materia
  delete corpo.Materia
  // console.log(`Materia: ${materia}`)
  // Assunto
  var assunto = corpo.Assunto
  delete corpo.Assunto
  // console.log(`Assunto: ${assunto}`)
  // Vestibular
  var vestibular = corpo.Vestibular
  delete corpo.Vestibular
  // console.log(`Vestibular: ${vestibular}`)
  // Gabarito
  var gabarito = corpo.Gabarito
  delete corpo.Gabarito
  // console.log(`Gabarito: ${gabarito}`)
  // Corpo
  // console.log(corpo)

  // Dados para enviar ao banco de dados também
  // questão
  var ranking = ''
  var stats = {
    acertos: 0,
    erros: 0
  }
  var _id = mongoose.Types.ObjectId()
  // Enviando para o banco de dados a questao
  var newQuestao = new Questao({
    _id,
    materia,
    assunto,
    vestibular,
    gabarito,
    ranking,
    stats
  })
  newQuestao
    .save()
    .then(() => console.log(`Questao ${_id} Adicionada!`))
    .catch(err => console.log('Error: ' + err))

  // Enviando para o banco de dados a questao layout
  var newQuestaoLayout = new QuestaoLayout({
    _id,
    corpo
  })
  newQuestaoLayout
    .save()
    .then(() => console.log(`Questao Layout ${_id} Adicionada!`))
    .catch(err => console.log('Error: ' + err))
})

// Encerrar comunicação
console.log('Acabou!')
// connection.close()
