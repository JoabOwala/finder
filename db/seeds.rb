
User.find_or_create_by!(email: "admin@example.com") do |user|
    user.password = "password"
    user.role = "admin"
  end
  