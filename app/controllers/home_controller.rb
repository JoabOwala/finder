class HomeController < ApplicationController
    def index
      if user_signed_in?
        # Redirect logged in users to the /index page (or wherever appropriate)
        redirect_to index_path
      else
        # Render the landing page (using Inertia)
        render inertia: 'Home'
      end
    end
  end
  