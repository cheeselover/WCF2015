class AddActiveToParticipations < ActiveRecord::Migration
  def change
    add_column :participations, :active, :boolean
  end
end
