json.extract! user, :id, :name, :email

if show_token
  json.auth_token user.auth_token
end
