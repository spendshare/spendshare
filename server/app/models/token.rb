class Token < ApplicationRecord
  belongs_to :user
  before_create :setup
  validates_presence_of :user

  def setup
    self.token = Token.generate_token
    set_valid_until
  end

  def set_valid_until
    self.valid_until = 5.days.from_now
  end

  def self.generate_token
    loop do
      token = SecureRandom.hex(32)
      break token if Token.where(token: token)
                          .where('valid_until > ?', Time.now)
                          .empty?
    end
  end
end
