const mongoose=require('mongoose');

exports.dbConnection =async()=>{
    mongoose.set('strictQuery',true)
    const mongourl = process.env.MONGO_URL;
    await mongoose.connect(mongourl)
        .then(()=>{
            console.log('Db Connected')
        }).catch((err)=>{
            console.log(err)
        })
}