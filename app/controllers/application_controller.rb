#app/conrollers/application_controller.rb
class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :configure_permitted_parameters, if: :devise_controller?

  inertia_share auth: -> {
    if user_signed_in?
      { user: { id: current_user.id, email: current_user.email, username: current_user.username } }
    else
      {}
    end
  }
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up,        keys: [:username])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end
end
