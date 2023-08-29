import mongoose from "mongoose";

import 'dotenv/config'

//required for local mongodb
const dbname = process.env.MONGO_DB
const localDBUrl = process.env.MONGO_URL;

//required for cloud mongodb
const username = process.env.MONGO_USER;
const  password =  process.env.MONGO_PASSWORD;
const clusterName = process.env.MONGO_CLUSTER || '';


const cloudUrl = `mongodb+srv://${username}:${password}@${clusterName}/${dbname}?retryWrites=true&w=majority`;
const localUrl = `${localDBUrl}/${dbname}`;
const connect = async ()=>{
try{
await mongoose.connect(cloudUrl,{
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