require 'base64'

class User < ApplicationRecord
  has_many :tokens

  def global_id
    Base64.encode64("User:#{id}")
  end
end
