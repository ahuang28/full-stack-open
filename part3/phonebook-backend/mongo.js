const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('please provide password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://amyhuang0605:${password}@phonebook.hlq7e9o.mongodb.net/personApp?retryWrites=true&w=majority&appName=phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
