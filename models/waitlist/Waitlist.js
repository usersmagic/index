const async = require('async');
const mongoose = require('mongoose');
const validator = require('validator');

const DUPLICATED_UNIQUE_FIELD_ERROR_CODE = 11000;
const MAX_TEXT_FIELD_LENGTH = 1e5;

const Schema = mongoose.Schema;

const WaitlistSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: MAX_TEXT_FIELD_LENGTH
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: MAX_TEXT_FIELD_LENGTH
  },
  company_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: MAX_TEXT_FIELD_LENGTH
  },
  company_url: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: MAX_TEXT_FIELD_LENGTH
  },
  details: {
    type: String,
    default: null,
    trim: true,
    minlength: 1,
    maxlength: MAX_TEXT_FIELD_LENGTH
  }
});

WaitlistSchema.statics.findWaitlistById = function (id, callback) {
  const Waitlist = this;

  if (!id || !validator.isMongoId(id.toString()))
    return callback('bad_request');

  Waitlist.findById(mongoose.Types.ObjectId(id.toString()), (err, waitlist) => {
    if (err) return callback('database_error');
    if (!waitlist) return callback('document_not_found');

    return callback(null, waitlist);
  });
};

WaitlistSchema.statics.createWaitlist = function (data, callback) {
  const Waitlist = this;

  if (!data)
    return callback('bad_request');

  if (!data.email || !validator.isEmail(data.email))
    return callback('email_validation');

  if (!data.name || typeof data.name != 'string' || !data.name.trim().length || data.name.trim().length > MAX_TEXT_FIELD_LENGTH)
    return callback('bad_request');

  if (!data.company_name || typeof data.company_name != 'string' || !data.company_name.trim().length || data.company_name.trim().length > MAX_TEXT_FIELD_LENGTH)
    return callback('bad_request');

  if (!data.company_url || typeof data.company_url != 'string' || !data.company_url.trim().length || data.company_url.trim().length > MAX_TEXT_FIELD_LENGTH)
    return callback('bad_request');

  const newWaitlistData = {
    email: data.email.trim(),
    name: data.name.trim(),
    company_name: data.company_name.trim(),
    company_url: data.company_url.trim(),
    details: data.details
  };

  const newWaitlist = new Waitlist(newWaitlistData);

  newWaitlist.save((err, waitlist) => {
    if (err && err.code == DUPLICATED_UNIQUE_FIELD_ERROR_CODE)
      return callback('duplicated_unique_field');
    if (err)
      return callback('database_error');

    return callback(null, waitlist._id.toString());
  });
};

module.exports = mongoose.model('Waitlist', WaitlistSchema);
