//DB Connection
const mongoose = require('mongoose');
mongoose.pluralize(null);

const url = `mongodb+srv://admin:u3nZhx8yHFnn3Ivk@cluster0.ezibze2.mongodb.net/?retryWrites=true&w=majority`;


run("Niedersachsen").catch(error => console.log(error.stack));

async function run(bundeslandstring) {
  await mongoose.connect(url, { useNewUrlParser: true });

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  let thisday = yyyy + mm + dd;

  const bundeslandSchema = new mongoose.Schema({ bundesland: String, datum: String });
  const bundesland = mongoose.model("Niedersachsen", bundeslandSchema);

  // Find the Day in Bundesland
  const theday = await bundesland.findOne({ datum: 'thisday' });
  return theday;
}
