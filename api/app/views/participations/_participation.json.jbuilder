json.(participation, :id, :game_id, :user_id, :user_type)

if participation.user_type == "zombie"
  json.num_kills participation.num_kills
  json.stun_end_time participation.stun_end_time
  json.active participation.active
elsif participation.user_type == "human"
  json.weapon participation.weapon
  json.active participation.active
end
