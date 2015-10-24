class CreatePartipications < ActiveRecord::Migration
  def change
    create_table :participations do |t|
      t.belongs_to :game, index: true
      t.belongs_to :user, index: true

      t.string :user_type
      t.datetime :stun_end_time
      t.integer :num_kills
      t.string :weapon
    end
  end
end
