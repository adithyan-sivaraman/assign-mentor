import mongoose from "mongoose";

import 'dotenv/config'

const dbname = process.env.MONGO_DB
const dburl = process.env.MONGO_URL;

const localUrl = `${dburl}/${dbname}`;
const connect = async ()=>{
try{
await mongoose.connect(localUrl,{
    useNewUrlParser: true,
});
console.log('connection established');
}
catch(error){
    console.log(error);
    process.exit(1);
}
};
export default connect;