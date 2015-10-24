class GamesController < AuthenticatedController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  before_action :set_game, only: [:update, :destroy]

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
      render "games/show"
    else
      render errors(@game)
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

  # DELETE /games/:id
  def destroy
    @game.destroy
    head :no_content
  end

  private

    def game_params
      params.permit(:title, :organizer, :description, :start_time, :end_time)
    end

    def set_game
      @game = current_user.games.find_by(id: params[:id])

      unless @game
        render model_not_found_error "Game"
      end
    end
end
