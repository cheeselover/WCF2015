# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151024175739) do

  create_table "games", force: :cascade do |t|
    t.string   "title"
    t.string   "organizer"
    t.text     "description"
    t.string   "start_time"
    t.string   "end_time"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "participations", force: :cascade do |t|
    t.integer  "game_id"
    t.integer  "user_id"
    t.string   "user_type"
    t.datetime "stun_end_time"
    t.integer  "num_kills"
    t.string   "weapon"
    t.boolean  "active"
  end

  add_index "participations", ["game_id"], name: "index_participations_on_game_id"
  add_index "participations", ["user_id"], name: "index_participations_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "auth_token"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["auth_token"], name: "index_users_on_auth_token", unique: true
  add_index "users", ["email"], name: "index_users_on_email", unique: true

end
