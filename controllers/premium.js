const User = require('../models/User');

exports.getBoard = async (req, res, next) => {
  try {
    const topUsers = await User.aggregate([
      {
        $project: {
          name: 1,
          totalExp: 1,
        },
      },
      {
        $sort: { totalExp: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(200).json(topUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
