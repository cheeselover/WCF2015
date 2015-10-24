json.array! @games do |game|
  json.partial! 'games/game', game: game, locals: {
    show_participations: true
  }
end
