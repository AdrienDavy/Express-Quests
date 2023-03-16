const { body, validationResult } = require('express-validator');




const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null) {
    errors.push({ field: "title", message: "This field is required" });
  } else if (title.length >= 255)
    errors.push({ field: "title", message: "Should contain less than 255 characters" })
  if (director == null) {
    errors.push({ field: "director", message: "This field is required" });
  } else if (director.length >= 255)
    errors.push({ field: "director", message: "Should contain less than 255 characters" })
  if (year == null) {
    errors.push({ field: "year", message: "This field is required" });
  } else if (year.length >= 255)
    errors.push({ field: "year", message: "Should contain less than 255 characters" })
  if (color == null) {
    errors.push({ field: "color", message: "This field is required" });
  } else if (color.length >= 255)
    errors.push({ field: "color", message: "Should contain less than 255 characters" })
  if (duration == null) {
    errors.push({ field: "duration", message: "This field is required" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};


// middleware avec le module express-validator

const validateUsers = [
  body('firstname').isLength({ max: 255 }),
  body('lastname').isLength({ max: 255 }),
  body('email').isLength({ max: 255 }).isEmail(),
  body('city').isLength({ max: 255 }),
  body('language').isLength({ max: 255 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      next();
    };
  },
];

module.exports = {
  validateMovie,
  validateUsers,
};

