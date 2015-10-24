class ChangeGamesDatesToStrings < ActiveRecord::Migration
  def change
    change_column :games, :start_time, :string
    change_column :games, :end_time, :string
  end
end
