class Api::DocumentsController < ApplicationController
  def show
    @document = Document.find(params[:id])

    if logged_in? && current_user == @document.author
      render "api/documents/show"
    else
      render json: ["Insufficient permissions"], status: 401
    end
  end

  def create
    if logged_in?
      @document = Document.new(name: params[:name], content: params[:content])
      @document.author = current_user

      if @document.save
        render "api/documents/show"
      else
        render json: @document.errors.full_messages, status: 422
      end
    else
      render json: ["Insufficient permissions"], status: 401
    end
  end

  def destroy

  end

  def update
    @document = Document.find(params[:id].to_i)
    if logged_in? && current_user == @document.author
      if @document.update(name: params[:name], content: params[:content])
        render "api/documents/show"
      else
        render json: @document.errors.full_messages, status: 422
      end
    else
      render json: ["Insufficient permissions"], status: 401
    end
  end

  def index
    if logged_in?
      @documents = Document.select(:id, :name, :updated_at).where(author: current_user).order(updated_at: :desc)

      render "api/documents/index"
    else
      render json: ["Insufficient permissions"], status: 401
    end
  end

  private

  def document_params

  end
end
