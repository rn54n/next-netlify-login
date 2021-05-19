exports.handler = async (event, context) => {
  // the context of the request
  // determine if the user is logged in
  const guides = [
    { title: "assdfdlfasd fljaksdf lasjfd asdlkfjasdf", author: "bong" },
    { title: "asdlffffasd fljaksdf lasjfd asdlkfjasdf", author: "dong" },
    { title: "asdlfaaaasd fljaksdf lasjfd asdlkfjasdf", author: "cun" },
  ];

  // if browser makes request from user logged in
  // get access to user
  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({
      msg: "ah, ah, ah you must be logged in to see this!",
    }),
  };
};
