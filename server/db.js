const mongoose=require('mongoose');

exports.dbConnection =async()=>{
    mongoose.set('strictQuery',true)
    const mongourl = 'mongodb+srv://anideepkalia71:anideepkalia71@cluster0.4bgy5md.mongodb.net/';
    await mongoose.connect(mongourl)
        .then(()=>{
            console.log('Db Connected')
        }).catch((err)=>{
            console.log(err)
        })
}