json.(participation, :id, :user_type)

if participation.user_type == "zombie"
  json.num_kills participation.num_kills
  json.stun_end_time participation.stun_end_time
elsif participation.user_type == "human"
  json.weapon participation.weapon
end
