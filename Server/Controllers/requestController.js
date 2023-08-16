const Request = require("../Models/requestModel");
const User = require("../Models/userModel");

exports.createRequest = async (req, res) => {
  try {
    const { to } = req.body;
    const request = new Request({
      from: req.user._id,
      to,
    });
    await request
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Request created successfully",
          request: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      $and: [{ to: req.user._id }, { status: { $ne: "Accepted" } }],
    })
      .populate("from", "fullName picture about")
      .populate("to", "fullName picture about");
    res.status(200).json({
      message: "Requests fetched successfully",
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

exports.handleStatus = async (req, res) => {
  const { requestId, newStatus } = req.body;

  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (
      newStatus !== "Pending" &&
      newStatus !== "Accepted" &&
      newStatus !== "Declined"
    ) {
      return res.status(400).json({ error: "Invalid status" });
    }

    request.status = newStatus;
    const result = await request.save();

    if (newStatus === "Accepted") {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { connections: request.to } },
        { new: true }
      );

      const sentUser = await User.findByIdAndUpdate(
        request.to,
        { $push: { connections: req.user._id } },
        { new: true }
      );

      if (user && sentUser) {
        return res.status(200).json({
          message: "Connection Added!",
          data: user,
        });
      } else {
        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(200).json({
        message: "Status updated successfully",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
