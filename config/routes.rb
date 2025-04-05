Rails.application.routes.draw do
  devise_for :users
  
  root "locations#index"
  
  resources :locations, only: [:index, :new, :create]
  
  namespace :admin do
    resources :users, only: [:index, :create, :destroy]
  end
  
  # Other routes…
  get 'inertia-example', to: 'inertia_example#index'
  get "up" => "rails/health#show", as: :rails_health_check
end
