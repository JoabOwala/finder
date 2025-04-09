
# Clear out old records if needed.
Location.destroy_all
User.destroy_all

# Create an admin user.
admin = User.create!(
  email: "admin@example.com",
  password: "password",
  role: "admin",
  username: "AdminUser"
)

# Predefined list of normal usernames.
usernames = [
  "alice", "bob", "odhis", "Nonini", "edward",
  "fiona", "george", "helen", "ian", "julia"
]

# Define a set of locations spread across Kenya and Africa.
locations_data = [
  { name: "Nairobi",       latitude: -1.2921,  longitude: 36.8219 },
  { name: "Mombasa",       latitude: -4.0435,  longitude: 39.6682 },
  { name: "Kisumu",        latitude: -0.0917,  longitude: 34.7680 },
  { name: "Kampala",       latitude:  0.3476,  longitude: 32.5825 },
  { name: "Addis Ababa",   latitude:  8.9806,  longitude: 38.7578 },
  { name: "Lagos",         latitude:  6.5244,  longitude: 3.3792  },
  { name: "Cairo",         latitude: 30.0444,  longitude: 31.2357 },
  { name: "Johannesburg",  latitude: -26.2041, longitude: 28.0473 },
  { name: "Dar es Salaam", latitude: -6.7924,  longitude: 39.2083 },
  { name: "Abidjan",       latitude:  5.3599,  longitude: -4.0083 }
]

# Create 10 regular users with associated locations.
10.times do |i|
  user = User.create!(
    email: "#{usernames[i]}@example.com",
    password: "password",
    role: "user",
    username: usernames[i]
  )

  # Use one of the locations from the array in a cyclic fashion.
  location = locations_data[i % locations_data.length]

  # Create the location belonging to this user.
  user.locations.create!(
    name: location[:name],
    latitude: location[:latitude],
    longitude: location[:longitude]
  )
end

puts "Created 1 admin and 10 users with associated locations."
