//Require express validator
const { body, validationResult } = require('express-validator');

//We will use sequelize for additional validation
//Check for Null values

const userRules = () => {
  return [
    // firstName exists
    body('firstName')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "firstName"'),

    // lastName exists
    body('lastName')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "lastName"'),

    // emailAddress exists
    body('emailAddress')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "emailAddress"'),

    // password exists - more validation to come for this.
    body('password')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "password"'),
  ];
};

const courseRules = () => {
  return [
    // title exists
    body('title')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "title"'),
    // description exists
    body('description')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "description"'),
  ];
};

/**
 * Validate sends a 400 level error if a validation error has occurred,
 * It sends out the errors as well
 * If no error exists, just move forward using next()
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = [];
    errors.array().map((err) => errorMessage.push({ [err.param]: err.msg }));

    //Instructions call for 400 error here
    return res.status(400).json({
      errors: errorMessage,
    });
  } else {
    return next();
  }
};

module.exports = {
  userRules,
  courseRules,
  validate,
};