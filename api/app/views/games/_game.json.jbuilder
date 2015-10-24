json.(game, :id, :title, :organizer, :description, :start_time, :end_time)
json.participants game.participations do |participation|
  json.partial! 'users/user', user: participation.user
end
