json.(event, :event_type, :latitude, :longitude)
json.attacker do
  json.partial! "users/user", user: event.attacker, locals: {
    show_participations: false,
    show_token: false
  }
end

json.defender do
  json.partial! "users/user", user: event.defender, locals: {
    show_participations: false,
    show_token: false
  }
end
