# app/controllers/sessions_controller.rb
class SessionsController < Devise::SessionsController
    before_action :set_no_cache, only: [:new]
    before_action :redirect_if_authenticated, only: [:new]
  
    private
  
    def set_no_cache
      response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
      response.headers["Pragma"] = "no-cache"
      response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
    end
  
    def redirect_if_authenticated
      redirect_to root_path if user_signed_in?
    end
  end
  