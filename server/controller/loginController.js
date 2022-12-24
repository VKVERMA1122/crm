const User = require("../model/user");
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const dotenv = require("dotenv").config({ path: "../config.env" });
const { compare } = require("bcryptjs");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email, !password) return res.status(401).json({ message: "all field are mandatory" })

    const userLogin = await User.findOne({ email })
    const userAuth = await compare(password, userLogin.password)
    if (!userAuth) {
      return res.status(400).json({ message: "user Password wrong" })
    }
    const userDetailForFront = {
      name: userLogin.name,
      id: userLogin._id,
      email: userLogin.email,
      phone: userLogin.phone,
      parentId: userLogin.parentId,
      userId: userLogin.userId,
    }
    console.log(userDetailForFront)
    // console.log(process.env.SECRET_KEY)
    // console.log(userLogin)
    if (userLogin) {
      const roles = Object.values(userLogin.roles)
      const accessToken = jwt.sign({
        "userInfo": {
          "name": userLogin.name,
          "roles": roles

        }
      }, process.env.SECRET_KEY,
        {
          expiresIn: "10m"
        })
      const refreshToken = jwt.sign({
        "userInfo": {
          "name": userLogin.name
        }
      }, process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: '7d'
        })
      userLogin.refreshToken = refreshToken
      const result = await userLogin.save();

      // console.log(result);
      res.cookie('userjwt', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      return res.json({ accessToken, userDetailForFront })
    }
  } catch (error) {
    res.send(error.message);
  }
};

const loginRefresh = async (req, res) => {
  const cookies = req.cookies;
  // console.log(cookies.userjwt);
  if (!cookies?.userjwt)
    return res.status(401).json({ message: "UnAuthorized" });
  const refreshToken = cookies.userjwt;
  console.log(refreshToken)
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.status(403).json({ message });

  // console.log(cookies.userjwt, foundUser);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_KEY,
    async (err, decoded) => {
      console.log(foundUser, decoded)

      if (err || foundUser?.name !== decoded.userInfo.name) return res.status(403).json({ message: "Forbidden" });

      const roles = Object.values(foundUser.roles)
      console.log(roles)
      const accessToken = jwt.sign(
        {
          "userInfo": {
            "name": foundUser.name,
            "roles": roles
          }
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "15m",
        }
      );
      res.json({
        accessToken,
        foundUser,
      });
    }
  );
};
// const accessToken = jwt.sign({
//   "userInfo": {
//     "name": decoded.name,
//     "roles": roles
//   }

// }, process.env.SECRET_KEY,
//   {
//     expiresIn: "1m"
//   })
// res.json({
//   accessToken,
//   foundUser
// })
//     })

// }

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.userjwt) return res.sendStatus(204);
  res.clearCookie("userjwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Cookie cleared" });
};
module.exports = {
  login,
  loginRefresh,
  logout,
};