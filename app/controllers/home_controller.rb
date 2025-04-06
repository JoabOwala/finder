
# app/controllers/home_controller.rb
class HomeController < ApplicationController
  def index
    if user_signed_in?
      if current_user.admin?
        render inertia: 'AdminHome', props: { 
          user: current_user, welcome_message: "Welcome #{current_user.username}!",
          locations: Location.includes(:user).all.as_json(include: { user: { only: [:username] } })
        }
      else
        render inertia: 'UserHome', props: { 
          user: current_user, welcome_message: "Welcome #{current_user.username}!",
          locations: Location.includes(:user).all.as_json(include: { user: { only: [:username] } })
        }
      end
    else
      render inertia: 'Home', props: { 
        locations: Location.includes(:user).all.as_json(include: { user: { only: [:username] } })
      }
    end
  end
end

