# app/controllers/registrations_controller.rb
class RegistrationsController < Devise::RegistrationsController
    before_action :redirect_if_authenticated, only: [:new]
  
    private
  
    def redirect_if_authenticated
      redirect_to root_path if user_signed_in?
    end
  end
  