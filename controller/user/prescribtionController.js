const { Users } = require("../../model");

exports.addPrescribtion = async (req, res) => {
  const { userId } = req;
  console.log(req.file);

  const user = await Users.findOne({
    where: {
      id: userId,
    },
  });
  user.prescribtion = req.file.filename;
  await user.save();
  res.json({
    status: 200,
    message: "success",
    user,
  });
};
