class ParticipationsController < AuthenticatedController
  before_action :authenticate_user, only: [:update]
  before_action :set_participations, only: [:update]

  # PUT /participations/:id/
  def update
    Event.create(
      game: @defender.game
      attacker: current_user,
      defender: @defender.user,
      event_type: (@defender.user_type == "human") ? "kill" : "stun"
      # latitude and longitude
    )

    if @attacker.user_type == "zombie"
      @defender.user_type = "zombie"
      @defender.weapon = nil;
      @defender.save
      # somehow handle updating of number of kills
    elsif @attacker.user_type == "human" and @defender.user_type == "zombie"
      @defender.stun_end_time = "15 minutes from now"
      @defender.save
    end

    @participation = @defender
    render "participations/show"
  end

  private

    def set_participations
      @defender = Participation.find_by(id: params[:id])

      if @defender
        @attacker = @defender.game.participations.find_by(user_id: current_user.id)

        unless @attacker
          render model_not_found_error "Attacker (Participation)"
        end
      else
        render model_not_found_error "Defender (Participation)"
      end
    end
end
