import { FastifyReply, FastifyRequest } from "fastify";
import { prismaClient } from "../prisma";
import { Users } from "../type-object/user-type";
import * as bcrypt from "bcrypt";

const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey('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')

export const sendConfirmationEmail = function({toUser, hash}) {
  const message = {
    from: "thegarage-backend <r.almatrafi@thegarage.sa>",
    to: toUser.email,
    subject: 'Activate Account',
    html: `
      <h3> Hello ${toUser.name} </h3>
      <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
    `
  }

  return sendGrid.send(message);
}

export const Register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = request.body as Users;
  const SALT = process.env.SALT;


  const hashedPassword = await bcrypt.hash(user.password, Number(SALT));
  return await prismaClient.user
    .findUnique({
      where: {
        email: user.email.toLowerCase(),
      },
    })
    .then((users) => {
      if (users) {
        reply.send("user already exists");
      } else {
        return  prismaClient.user
          .create({
        
            data: {
              ...user,
              password: hashedPassword,
              email: user.email.toLowerCase(),
            },
          })
          .then((User) => {
            sendConfirmationEmail({toUser: user, hash: User.user_id })

            reply.send("Registered");
          });
      }
    });
}
export const Login = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.body as Users;
  return await prismaClient.user
    .findUnique({
      where: {
        email: user.email,
      },
    })
    .then(async (User) => {
      const token = await reply.jwtSign(
        {
          id: User.user_id,
        },
        { expiresIn: "2h" }
      );
      const result = {
        name: User.name,
        id: User.user_id,
        token,
      };
    
      if (!User) {
        reply.send("user not found");
      }
      const checkPassword = await bcrypt.compare(user.password, User.password);
      if (!checkPassword) {
        reply.send("password incorrect");
      }
      if (!User.isActive) {
        reply.send("user is not active");
      }
      reply.send(result);
    });
};

export const findUser=async (req,res)=>{
  console.log('jjjjjjjjjjjjjj');
const hash = req.params.hash

 await prismaClient.user.update({
  where: {
    user_id:hash,
},
data:{
  isActive:true
}
})

res.send({message:"Your account is activated"})
}


export const sendMail =async(req,res)=>{
  const user = req.body as Users;

  try{
    const userData = await prismaClient.user.findUnique({
      where:{
        email:user.email
      }
    })
    console.log(userData);
    if (userData) {
      let otp = Math.floor(1000 + Math.random() * 9000);
      const messageData ={
        to:user.email,
        from: "thegarage-backend <r.almatrafi@thegarage.sa>",
        subject:'Email for reset password',
        text:`your otp for reset password is `,
        html:`<h1>${otp}</h1>`}

      const updateData = await prismaClient.user.update(
       
  {
    where:{
      email:user.email
    },
data:{
  otp:otp
}
  }
      );
    await sendGrid.send(messageData)
      await res.send(
        updateData
      );
}
}
catch(error){
res.status(400).send(error)
}
}


export const verifyOTP = async (req, res) => {
  try {
    const email = req.params.email;
    const { otp } = req.body;
    const user = await prismaClient.user.findUnique({
      where:{
        email:email
      }
    })

    if (user.otp == otp) {
      const updateData = await prismaClient.user.update(
    {
      where:{
        email:email
      },
    data: { otp: 0 },
   
    }
      );

     await res.send(updateData);
      console.log("correct");
    
    } else {
      res.send({ otp: "otp not correct" });

    }
  } catch (error) {
await    res.send({ msg: `ERRRor ${error.message}` });
  }
};

export const resetPassword = async (req, res) => {
  try{
    const id = req.params.id;
    const { password } = req.body;
  
 const newPassword= await bcrypt.hash(password,10);
  
const updateDATA= await prismaClient.user.update({
  where: {
    user_id:id,
},
data:{
  password:newPassword
}
})

res.send(updateDATA)

   }catch(err){
    res.send({err})
 
   }
};


export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = await prismaClient.user.findMany();
  return user;
};
