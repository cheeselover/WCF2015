class AddRunningToGames < ActiveRecord::Migration
  def change
    add_column :games, :running, :boolean, default: false
  end
end
