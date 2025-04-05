class Location < ApplicationRecord
  belongs_to :user
  validates :name, :latitude, :longitude, presence: true
end
