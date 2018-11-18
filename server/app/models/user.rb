class User < ApplicationRecord
  has_many :tokens

  def global_id
    return nil if id == nil
    Base64.strict_encode64("User:#{id}")
  end
end
