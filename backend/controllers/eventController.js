import Event from "../models/Event.js";

export const getAll = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: "Event not found" });
    res.json(ev);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const data = req.body;
    data.createdBy = req.user.id;
    const ev = await Event.create(data);
    res.status(201).json(ev);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const ev = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(ev);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
