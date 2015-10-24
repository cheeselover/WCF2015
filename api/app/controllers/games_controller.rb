class GamesController < AuthenticatedController
  before_action :authenticate_user, only: [:join, :leave, :create, :update, :destroy]
  before_action :set_game, only: [:leave, :update, :destroy]

  # GET /games
  def index
    @games = Game.all
    render "games/index"
  end

  # GET /games/:id
  def show
    @game = Game.find_by(id: params[:id])

    if @game
      render "games/show"
    else
      render model_not_found_error "Game"
    end
  end

  # POST /games
  def create
    @game = current_user.games.build(game_params)

    if @game.save
      Participation.create(user: current_user, game: @game, user_type: "creator")
      render "games/show"
    else
      render errors(@game)
    end
  end

  # POST /games/:id
  def join
    @game = Game.find_by(id: params[:game_id])
    @participation = @game.participations.find_by(user_id: current_user.id)

    if @participation
      if @participation.active
        render json: { errors: "You are already an active player in this game!" }, status: :unprocessable_entity
      else
        @participation.active = true
        @participation.save
        render "participations/show"
      end
    else
      @participation = Participation.create(
        user: current_user,
        game: @game,
        user_type: "human",
        weapon: params[:weapon] || "unarmed",
        active: true
      )
      render "participations/show"
    end
  end

  # DELETE /games/:id
  def leave
    @participation = @game.participations.find_by(user_id: current_user.id)

    if @participation
      @participation.active = false
      @participation.save
      render "participations/show"
    end
  end

  # PATCH/PUT /games/:id
  def update
    if @game.update(game_params)
      head :no_content
    else
      render errors(@game)
    end
  end

  private

    def game_params
      params.permit(:title, :organizer, :description, :start_time, :end_time)
    end

    def set_game
      @game = current_user.games.find_by(id: params[:id] || params[:game_id])

      unless @game
        render model_not_found_error "Game"
      end
    end
end
