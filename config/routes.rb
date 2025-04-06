# config/routes.rb
Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'signup' }

  resources :locations, only: [:create]

  # New root to the landing page
  root "home#index"
  
end
