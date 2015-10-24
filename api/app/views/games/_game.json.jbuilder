json.(game, :id, :title, :organizer, :description, :start_time, :end_time)

if locals[:show_participations]
  json.participations game.participations do |participation|
    json.partial! 'participations/participation', participation: participation

    json.user do
      json.partial! 'users/user', user: participation.user, locals: {
        show_token: false,
        show_participations: false
      }
    end
  end
end
