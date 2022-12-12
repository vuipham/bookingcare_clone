import bcrypt from 'bcryptjs';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.Users.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phoneNumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })

            resolve('success')

        } catch(e) {
            reject(e);
        }
    })
}  

let hashUserPassword = (password) => {
    return new Promise( async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch(e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.Users.findAll({
                raw: true,
            });
            resolve(users)
        } catch(e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                raw: true,
                where: {id: userId}
            })

            if(user) {
                resolve(user);
            } else {
                resolve({})
            }
        } catch(e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: data.id }
            })
            console.log(data)
            if(user) {
                user.firstName = data.firstname;
                user.lastName = data.lastname;
                user.address = data.address;

                await user.save();

                let allUsers = await db.Users.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch(e) {
            console.log(e);
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
}