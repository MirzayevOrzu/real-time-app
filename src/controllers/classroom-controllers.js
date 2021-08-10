const { Classroom } = require("../models");
const { Message } = require("../models");

module.exports.makeClassroom = async (req, res) => {
  const { name, _type } = req.body; // make it className
  const { user } = req;
  const existingGroup = await Classroom.findOne({ name });

  if (existingGroup) {
    res.status(400).json({
      message: `Classroom called "${name}" already exists`,
    });
  } else {
    const newClassroom = new Classroom({
      name,
      _type,
      admin: { name: user.displayName, id: user._id },
    });
    await newClassroom.save();

    res.redirect("/");
  }
};

module.exports.renderClassroom = async (req, res) => {
  const { classId } = req.query;
  const classroom = await Classroom.findById(classId);
  const messages = await Message.find({ classId }).sort("date").limit(20);

  res.render("classroom", { classroom, user: req.user, messages });
};
