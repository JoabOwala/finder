
# app/controllers/home_controller.rb
class HomeController < ApplicationController
  def index
    if user_signed_in?
      if current_user.admin?
        render inertia: 'AdminHome', props: { 
          user: current_user, welcome_message: "Welcome #{current_user.username}!" 
        }
      else
        render inertia: 'UserHome', props: { 
          user: current_user, welcome_message: "Welcome #{current_user.username}!",
          locations: Location.all
        }
      end
    else
      render inertia: 'Home', props: { locations: Location.all }
    end
  end
end

