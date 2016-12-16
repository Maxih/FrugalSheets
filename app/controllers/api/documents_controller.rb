class Api::DocumentsController < ApplicationController
  def show
    @document = Document.find(params[:id])

    if logged_in? && (current_user == @document.author || current_user.documents.where(id: @document.id))
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
    if logged_in? && (current_user == @document.author || current_user.documents.where(id: @document.id))
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
      @documents = current_user.documents.order(updated_at: :desc) + current_user.authored_documents.select("documents.id, documents.name, documents.updated_at, 'me' AS group_name, -1 AS group_id").order(updated_at: :desc)
      @documents.sort! {|x, y| x.updated_at <=> y.updated_at}
      
      render "api/documents/index"
    else
      render json: ["Insufficient permissions"], status: 401
    end
  end

  private

  def document_params

  end
end
