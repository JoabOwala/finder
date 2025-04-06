# app/controllers/locations_controller.rb
class LocationsController < ApplicationController
    before_action :authenticate_user!
    
    def index
      @locations = Location.all
      render inertia: 'LocationsIndex', props: { locations: @locations, auth: { user: current_user } }
    end
    
    def create
      @location = current_user.locations.build(location_params)
      if @location.save
        redirect_to locations_path, notice: "Location created!"
      else
        render inertia: 'Locations/New', props: { errors: @location.errors.full_messages }
      end
    end
    
    private
    
    def location_params
      params.require(:location).permit(:name, :latitude, :longitude)
    end
  end
  