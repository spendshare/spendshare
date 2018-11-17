class Accounts
  def self.get(data)
    user = User.find_by(email: data[:email])
    return user if user
    User.create(name: data[:name], email: data[:email])
  end
end
