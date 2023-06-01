
const fastify = require('fastify')()
export const authentication =  async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
  const vailed =await  req.jwtVerify(token)
    req.token = vailed;
   next();
  
   
  } catch (error) {
    console.log('catch-0-0-0-0-00');

    res.status(403);
    res.send(error);
    console.log(error);    
  }
};

