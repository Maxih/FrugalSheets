class Api::DocumentGroupsController < ApplicationController
  def create
    if logged_in?
      @document = Document.find(params[:document_id].to_i)
      @group = Group.find(params[:group_id].to_i)

      if(@document.author == current_user && @group.owner == current_user)
        if @group.documents.push(@document)
          render "api/documents/show"
        else
          render json: @document_group.errors.full_messages, status: 422
        end
      else
        render json: ["Insufficient permissions"], status: 401
      end
    else
      render json: ["Insufficient permissions"], status: 401
    end
  end

  def destroy

  end
end
