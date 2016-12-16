class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:email],
      params[:password]
    )
    if @user
      log_in(@user)
      render "api/users/show"
    else
      render json: ["Invalid Credentials"], status: 401
    end
  end

  def destroy
    log_out
    render json: {}
  end
end
