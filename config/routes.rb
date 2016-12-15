Rails.application.routes.draw do
  root 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :documents, only: [:index, :create, :update, :destroy, :show]
    resources :groups, only: [:index, :create, :update, :destroy]
    resources :document_groups, only: [:create, :destroy]
    resources :user_groups, only: [:create, :destroy]
  end
end
