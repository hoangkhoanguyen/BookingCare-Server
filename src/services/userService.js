import { hash } from 'bcryptjs'
import bcrypt from 'bcryptjs/dist/bcrypt'
import { has } from 'lodash'
import applicationDB from '../models/index'
const salt = bcrypt.genSaltSync(10)

let createNewUser = async (data) => {
    try {
        let hash = await bcrypt.hashSync(data.password, salt)
        await applicationDB.User.create({
            email: data.email,
            password: hash,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            role: data.role,
            position: data.position,
            image: data.image
        })
        return {
            errCode: 0,
            message: 'ok create a new user succeed'
        }
    } catch (error) {
        console.log(error)
        return { errMessage: 'Something wrong!' }
    }
}

const handleUserLogin = async (email, password) => {
    try {
        let userData = {}
        let isExist = await checkUserEmail(email)
        if (isExist) {
            let user = await applicationDB.User.findOne({
                where: { email: email },
                raw: true,
            })
            let isValid = await bcrypt.compareSync(password, user.password)
            if (isValid) {
                userData.errCode = 0
                userData.errMessage = 'OK!'
                delete user.password
                userData.user = user
            } else {
                userData.errCode = 3
                userData.errMessage = 'Wrong password!'
            }
            return userData
        } else {
            userData.errCode = 1
            userData.errMessage = `Your email doesn't exist!`
            return userData
        }
    } catch (error) {
        return { errMessage: `Something wrong!` }
    }
}

const checkUserEmail = async (email) => {
    try {
        let user = await applicationDB.User.findOne({
            where: { email: email }
        })
        return user ? true : false
    } catch (error) {
        return null
    }
}

const deleteUser = (email) => {

}

const getHash = async (pass) => {
    try {
        let hash = await bcrypt.hashSync(pass, salt)
        return {
            errCode: 0,
            data: hash
        }
    } catch (error) {
        return {
            errCode: -1,
            errMessage: 'Error Server!'
        }
    }
}

module.exports = {
    handleUserLogin: handleUserLogin,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    getHash,
}