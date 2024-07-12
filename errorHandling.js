const errorHandler = (err, req, res, next) => {
  if(err.status === 400){
    return res.status(400).json({
      message:"Bad request",
      status:false
    })
  }
  if(err.status === 401){
    return res.status(401).json({
      message:"Unautorized access",
      status:false
    })
  }
  res.status(err.status || 500).json({ message: "Error has occured" });
};

const notFoundhandler = (req, res, next) => {
  return res.status(404).json({
    message: "Not found",
    status: false,
  });
};

const demoRoute = (req,res,next) => {
  return res.status(400).json({
    message:"bad request",
    status:false
  })
};

const unauthorizedRoute = (req, res, next) => {
  return res.status(401).json({
    message:"Unautorized access",
    status:false
  })
};
module.exports = { errorHandler, notFoundhandler,demoRoute,unauthorizedRoute };
