exports.handler = async () => {
  console.log("function run");
  const data = { name: "John", age: 35, job: "bouncer" };

  // return response to browser
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
