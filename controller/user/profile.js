const db = require("./../../model/index");
const Profile = db.Profile;
const Users = db.Users;

//Dispalying Profile Information
exports.getProfile = async (req, res, next) => {
  let profile = await Profile.findOne({
    where: {
      userId: req.userId,
    },
    include: [
      {
        model: Users,
      },
    ],
  });

  res.status(200).send({
    profile,
  });
};

//Adding Profile
exports.postProfile = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send({
      message: "No file was Uploaded",
    });
    return;
  }

  let data = {
    image: req.file.filename,
  };

  let profile = await Profile.update(
    { ...data },
    { where: { userId: req.userId } }
  );
  if (profile) {
    res.status(200).send({
      message: "sdafadf",
      profile,
    });
  } else {
    res.status(400).send({
      message: "err",
      profile,
    });
  }
};
