# # app/controllers/home_controller.rb
# class HomeController < ApplicationController
#     def index
#       if user_signed_in?
#         # Redirect logged in users to the /index page (or wherever appropriate)
#         redirect_to index_path
#       else
#         # Render the landing page (using Inertia)
#         render inertia: 'Home'
#       end
#     end
#   end
  

# app/controllers/home_controller.rb
class HomeController < ApplicationController
  def index
    if user_signed_in?
      if current_user.admin?
        render inertia: 'AdminHome', props: { user: current_user }
      else
        render inertia: 'UserHome', props: { user: current_user }
      end
    else
      render inertia: 'Home'
    end
  end
end
