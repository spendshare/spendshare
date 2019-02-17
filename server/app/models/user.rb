class User < ApplicationRecord
  has_many :tokens
  has_many :members
  validates :name, :email, presence: true
  validates_uniqueness_of :email

  def global_id
    return nil if id.nil?

    Base64.strict_encode64("User:#{id}")
  end

  def balance
    0
  end
end
