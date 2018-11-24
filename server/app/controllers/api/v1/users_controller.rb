class Api::V1::UsersController < ApplicationController
  def all
    ok(User.all.map do |u|
      {
        email: u.email,
        id: u.global_id,
        name: u.name
      }
    end)
  end
end
