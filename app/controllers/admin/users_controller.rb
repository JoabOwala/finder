# app/controllers/admin/users_controller.rb
module Admin
    class UsersController < ApplicationController
      before_action :authenticate_user!
      before_action :ensure_admin
  
      def index
        @users = User.all
        render inertia: 'Admin/Users/Index', props: { users: @users }
      end
  
      def new
        @user = User.new
        render inertia: 'Admin/Users/New'
      end

      def create
        @user = User.new(user_params)
        if @user.save
          redirect_to admin_users_path, notice: "User created!"
        else
          render inertia: 'Admin/Users/New', props: { errors: @user.errors.full_messages }
        end
      end
  
      def destroy
        @user = User.find(params[:id])
        if @user == current_user
          redirect_to admin_users_path, alert: "You cannot delete yourself!"
        else
          @user.destroy
          redirect_to admin_users_path, notice: "User deleted!"
        end
      end
  
      private
  
      def ensure_admin
        redirect_to root_path, alert: "Access denied" unless current_user.admin?
      end
  
      def user_params
        params.require(:user).permit(:email, :password, :role, :username)
      end
    end
  end
  