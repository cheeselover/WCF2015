class UsersController < AuthenticatedController
  before_action :authenticate_user, only: [:me, :update, :destroy]

  # GET /users/:id
  def show
    @user = User.find_by(id: params[:id])

    if @user
      render "users/show"
    else
      render model_not_found_error "User"
    end
  end

  # GET /users/:user_id/active_game
  def active_game
    @user = User.find_by(id: params[:user_id])

    if @user
      @participation = @user.participations.where(active: true).first

      if @participation
        render "participations/show"
      else
        head :no_content
      end
    else
      render model_not_found_error "User"
    end
  end

  # GET /users
  def index
    @users = User.all
    render "users/index"
  end

  # POST /users/login
  def login
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
      cookies.permanent.signed[:token] = @user.auth_token
      render "users/login"
    else
      render json: { errors: "Invalid username/password" }, status: 401
    end
  end

  # GET /users/me
  def me
    render "users/login"
  end

  # DELETE /users/logout
  def logout
    cookies.delete :token
    head :ok
  end

  # POST /users
  def create
    valid_params = params.permit(:name, :email, :password, :password_confirmation)
    @user = User.new(valid_params)

    if @user.save
      cookies.permanent.signed[:token] = @user.auth_token
      render "users/login"
    else
      render errors(@user)
    end
  end

  # PATCH/PUT /users/:id
  def update
    valid_params = params.permit(:email, :password, :password_confirmation)

    if current_user.update(valid_params)
      head :no_content
    else
      render errors(current_user)
    end
  end

  # DELETE /users/:id
  def destroy
    current_user.destroy
    head :no_content
  end
end
