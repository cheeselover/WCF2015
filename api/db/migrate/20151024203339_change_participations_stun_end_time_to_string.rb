class ChangeParticipationsStunEndTimeToString < ActiveRecord::Migration
  def change
    change_column :participations, :stun_end_time, :string
  end
end
