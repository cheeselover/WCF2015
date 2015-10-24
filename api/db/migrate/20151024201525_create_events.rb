class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :attacker_id, index: true
      t.integer :defender_id, index: true
      t.string :event_type
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps null: false
    end
  end
end
