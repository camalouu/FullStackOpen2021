const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Provide password')
    process.exit(1)
}

const [, , password, name, number] = process.argv

const url =
    `mongodb+srv://user010607:${password}@cluster0.xhwth.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const personSchema = mongoose.Schema({
    name: String,
    number: Number
})

const Person = new mongoose.model('Persons', personSchema)

if (name && number) {

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(() => {
        console.log(`added ${name} ${number} to phonebook`)
        mongoose.connection.close()
    })

} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}