const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Load models
const Bootcamp = require("./models/Bootcamp");

//Conect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

//Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

//Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log("Data imported......");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete data
const deleteData = async()=>{
	try{
		await Bootcamp.deleteMany();
		console.log('Data deleted...');
		process.exit(); 

	}catch(err){
		console.log(err);
	}
}

if(process.argv[2] === '-i'){
	importData();
}else if(process.argv[2] === '-d'){
	deleteData();
}