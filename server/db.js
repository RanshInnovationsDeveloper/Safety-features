const mongoose=require('mongoose');

exports.dbConnection =async()=>{
    mongoose.set('strictQuery',true)
    await mongoose.connect('mongodb+srv://shubhamsingalransh:Abc123@cluster0.4bgy5md.mongodb.net/')
        .then(()=>{
            console.log('Db Connected')
        }).catch((err)=>{
            console.log(err)
        })
}