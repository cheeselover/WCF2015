json.(user, :id, :name, :email)

if show_token
  json.auth_token user.auth_token
end

if show_games
  json.games user.participations do |participation|
    json.partial! 'games/game', game: participation.game
    json.partial! 'participations/participation', participation: participation
  end
end
