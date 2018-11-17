class Token < ApplicationRecord
  belongs_to :user

  before_create :generate_token

  def generate_token
    loop do
      token = SecureRandom.hex(32)
      break token if Token
        .where(token: token)
        .where('valid_until > ?', Time.now)
        .empty?
    end
  end
end
