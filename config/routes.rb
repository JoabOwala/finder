# config/routes.rb
Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'signup' }

  
  # New root to the landing page
  root "home#index"
  
  # Define a route for logged in users landing page
  get 'index', to: 'locations#index', as: :index

  resources :locations, only: [:index, :new, :create]
  
  namespace :admin do
    resources :users, only: [:index, :create, :destroy]
  end

  # Other routes…
  get 'inertia-example', to: 'inertia_example#index'
  get "up" => "rails/health#show", as: :rails_health_check
end
