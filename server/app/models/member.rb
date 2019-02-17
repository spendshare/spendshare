class Member < ApplicationRecord
  belongs_to :user
  belongs_to :group
  has_many :participations
end
