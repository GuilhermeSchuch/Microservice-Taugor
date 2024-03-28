// const bcrypt = require("bcrypt");
// const crypto = require("crypto");
// const { connect } = require("getstream");
// const StreamChat = require("stream-chat").StreamChat;

// const API_KEY = process.env.STREAM_API_KEY;
// const API_SECRET = process.env.STREAM_API_SECRET;
// const APP_ID = process.env.STREAM_APP_ID;

// const client = StreamChat.getInstance(API_KEY, API_SECRET);
// const serverClient = connect(API_KEY, API_SECRET, APP_ID);

// const signup = async (req, res) => {
//   try {
//     const { username, email, password, confirmPassword } = req.body;

//     if(!username || !email || !password || !confirmPassword) {
//       return res.status(400).json({ message: "Preencha todos os campos!" })
//     }

//     if(password != confirmPassword) {
//       return res.status(400).json({ message: "Confirmação de senha incorreta!" })
//     }

//     const { users } = await client.queryUsers({ email: email });

//     if(users.length > 0) {
//       return res.status(400).json({ message: "E-mail já cadastrado!" })
//     }

//     const userId = crypto.randomBytes(16).toString("hex");
//     let socialToken;

//     // Check if the generated socialToken already exists in the database
//     let tokenExists = true;
//     while (tokenExists) {
//       socialToken = crypto.randomBytes(8).toString("hex");

//       const { users } = await client.queryUsers({ socialToken })
      
//       if (users.length === 0) {
//         tokenExists = false;
//       }
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const token = serverClient.createUserToken(userId);

//     return res.status(200).json({ token, username, email, userId, hashedPassword, socialToken });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Algo deu errado, tente novamente mais tarde." })
//   }
// }

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const { users } = await client.queryUsers({ email: email })

//     if(!users.length) {
//       return res.status(400).json({ message: "Usuário não encontrado!" })
//     }

//     const success = await bcrypt.compare(password, users[0].hashedPassword);
//     const token = serverClient.createUserToken(users[0].id);

//     if(success) {
//       return res.status(200).json({ token, username: users[0].username, userId: users[0].id, socialToken: users[0].socialToken });
//     }
//     else {
//       return res.status(500).json({ message: "Senha incorreta!" });
//     }

//   } catch (error) {
//     return res.status(500).json({ message: "Algo deu errado, tente novamente mais tarde." })
//   }
// }

// module.exports = { signup, login }