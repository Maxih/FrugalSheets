class Api::GroupsController < ApplicationController
  def index
    if logged_in?
      # @groups = Group.select(:id, :name, :updated_at).where(owner: current_user)

      @groups = current_user.groups;

      render "api/groups/index"
    else
      render json: ["Insufficient permissions"], status: 401
    end
  end

  def create
    if logged_in?
      @group = Group.new(name: params[:name])
      @group.owner = current_user

      if @group.save
        render "api/groups/show"
      else
        render json: @group.errors.full_messages, status: 422
      end
    else
      render json: ["Insufficient permissions"], status: 401
    end
  end

  def update
    @group = Group.find(params[:id].to_i)
    if logged_in? && current_user == @group.owner
      if @group.update(name: params[:name])
        render "api/groups/show"
      else
        render json: @group.errors.full_messages, status: 422
      end
    else
      render json: ["Insufficient permissions"], status: 401
    end
  end

  def destroy

  end
end
