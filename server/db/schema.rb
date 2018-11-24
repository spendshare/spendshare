# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_24_161043) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bills", force: :cascade do |t|
    t.string "title"
    t.bigint "added_by_id"
    t.decimal "amount", precision: 8, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "visible"
    t.index ["added_by_id"], name: "index_bills_on_added_by_id"
  end

  create_table "participants", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "bill_id"
    t.decimal "amount", precision: 8, scale: 2
    t.index ["bill_id"], name: "index_participants_on_bill_id"
    t.index ["user_id"], name: "index_participants_on_user_id"
  end

  create_table "tokens", force: :cascade do |t|
    t.string "token"
    t.datetime "valid_until"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_tokens_on_token"
    t.index ["user_id"], name: "index_tokens_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["name"], name: "index_users_on_name"
  end

  add_foreign_key "bills", "users", column: "added_by_id"
end
