/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User schema
 */

const GroupSchema = new Schema({
  name: { type: String, default: '' }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

GroupSchema.method({});

/**
 * Statics
 */

GroupSchema.static({});

/**
 * Register
 */

mongoose.model('Group', GroupSchema);
