const User = require("../model/user");
const AutoIncrement = require('mongoose-sequence')
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
    try {
        const { name, userPic, email, phone, password, cPassowrd, parentId, roles } = req.body;
        // const startSeq = 1000;
        // const uniqueSeq = AutoIncrement(startSeq)
        // const newUserId = name.slice(0, 4) + uniqueSeq;
        // console.log(newUserId);

        if (!name, !userPic, !email, !phone, !password, !cPassowrd, !roles) {
            return res.status(400).send('All fields are mandatory !')
        }
        if (password != cPassowrd) {
            return res?.status(401)?.send('Password should be same !')
        }
        // id Duplicate
        const duplicate = await User.findOne({ name, phone, email })
        if (duplicate) return res.status(409).json({ message: "Duplicate User" })
        const totalUser = await User.find({ "roles": "SalesPerson" })
        console.log(totalUser.length)
        const startNum = 9999 + totalUser.length + 1
        const nickName = name.slice(0, 4) + startNum
        console.log(nickName)
        const hashedPwd = await bcrypt.hash(password, 10)
        console.log(hashedPwd)
        const userCreated = await User.create({
            name,
            userPic,
            userName: nickName,
            email,
            phone,
            password: hashedPwd,
            roles,
            parentId
        })
        res?.send(userCreated);
    } catch (error) {
        res?.send(error?.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req?.params?.userId
        console.log(userId);

        const { email, phone, userProfile } = req.body;
        if (userId) {
            const userUpdated = await User.findOneAndUpdate({ userId: userId }, {
                $set: {
                    email: email,
                    phone: phone,
                    userProfile: userProfile
                }
            })
            res.send("Successfully Updated");
        }
    } catch (error) {
        console.log(error.message)

    }
}

const getAllUser = async (req, res) => {
    try {
        const parentId = req?.params?.parentId;
        const userFind = await User.find({ parentId: parentId });
        res.send(userFind);
    } catch (error) {
        console.log(error.message)
    }
}
const getAllUserName = async (req, res) => {
    try {
        const parentId = req?.params?.parentId;
        const userFind = await User.find({ parentId: parentId });
        const getNames = await userFind.map(({ name }) => name)
        // const {user} = userFind;
        // console.log(user.name)
        const names = Object.assign({}, getNames);
        res.send(names)
    } catch (error) {
        console.log(error.message);
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req?.params?.userId;
        const getUser = await User.find({ userId: userId })
        res.send(getUser)
    } catch (error) {
        console.log(error.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const userID = req?.params?.userID;
        res.send(userID)
        const userDelete = await User.find({ userID: userID });
        res.send(userDelete)
    } catch (error) {
        console.log(error.message)
    }
}




module.exports = {
    createNewUser,
    updateUser,
    getAllUser,
    deleteUser,
    getAllUserName
};