# config/routes.rb
Rails.application.routes.draw do
  devise_for :users, controllers: { 
    sessions: 'sessions',
    registrations: 'registrations'
  }, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'signup' }
  
  resources :locations, only: [:create]

  namespace :admin do
    resources :users, only: [:index, :new, :create, :destroy]
    get '/', to: 'home#index', as: :dashboard
  end

  # New root to the landing page
  root "home#index"

    # Catch-all route (must be last)
    match "*path", to: "application#handle_unavailable", via: :all
  
end
