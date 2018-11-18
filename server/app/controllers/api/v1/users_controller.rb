class Api::V1::UsersController < ApplicationController
  def all
    ok(data: User.all.map { |u| {
      email: u.email,
      id: u.global_id,
      name: u.name,
    } })
  end
end
