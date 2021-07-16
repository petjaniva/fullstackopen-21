const mongoose =require('mongoose')
if (process.argv.length < 3) {
    console.log('Password please')
    process.exit(1)
}
const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://petju:${password}@cluster0.t4rlh.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3)
{
    console.log('phonebook:')
    Person.find({}).then(result =>{
        result.forEach(person => {
            console.log(person)
        })
    mongoose.connection.close()
    process.exit(0)
    }) 
}
const person = new Person({
    name: newName,
    number: newNumber
})

person.save().then(result=>{
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
})