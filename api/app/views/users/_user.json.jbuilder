json.(user, :id, :name, :email)

if locals[:show_token]
  json.auth_token user.auth_token
end

if locals[:show_participations]
  json.participations user.participations do |participation|
    json.partial! 'participations/participation', participation: participation

    json.game do
      json.partial! 'games/game', game: participation.game, locals: {
        show_participations: false
      }
    end
  end
end
