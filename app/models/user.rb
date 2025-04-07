# app/models/user.rb
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  has_many :locations, dependent: :destroy
  validates :username, presence: true, uniqueness: true

  def admin?
    role == "admin"
  end

  # Finds or creates a user from the Google OAuth2 callback
  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(email: data['email']).first

    # Create the user if it doesn't exist
    unless user
      user = User.create(
        username: data['name'],
        email: data['email'],
        password: Devise.friendly_token[0, 20]
      )
    end
    user
  end
end
