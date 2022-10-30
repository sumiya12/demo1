const service = require("./serviceDemo");

const getall = async (req, res) => {
  try {
    const demo = await service.get(req);
    res.json({ data: demo, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};
const getById = async (req, res) => {
  try {
    const demo = await service.getBy(req);
    res
      .status(200)
      .json({ data: demo, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};

const createDemo = async (req, res) => {
  try {
    const demo = await service.create(req);
    res
      .status(200)
      .json({ data: demo, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};
const createbyid = async (req, res) => {
  try {
    const demo = await service.createbyid(req);
    res
      .status(200)
      .json({ data: demo, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};

const update = async (req, res) => {
  try {
    const demo = await service.update(req);
    res.status(200).json({ data: demo, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};

const deletes = async (req, res) => {
  try {
    const demo = await service.deletes(req);
    res
      .status(200)
      .json({ data: demo, success: "Succesfull", message: "Succesfull" });
  } catch (error) {
    res.json({ data: error });
  }
};
module.exports = {
  getall,
  createDemo,
  update,
  deletes,
  getById,
  createbyid
};
