const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema= new mongoose.Schema({
    name: {
        type: String,index:true,default:''
    },
    email: {
        type: String,index:true,default:''
    },
    password: {
        type: String,index:true,default:''
    }
});

adminSchema.pre('save', async function(next){
try {
    const salt = await bcrypt.genSalt(10);
    const hashpass= await bcrypt.hash(this.password,salt)
    this.password=hashpass
    next()
} catch (error) {
    next(error)
}
});
// async function hashing(){
//   bcrypt.compare(hashpass, hash, function(err, result) {
//     if(error) throw error
//     password=result
//     return password
// });
// }
const Admin = module.exports=mongoose.model('admins',adminSchema)  
module.exports = Admin