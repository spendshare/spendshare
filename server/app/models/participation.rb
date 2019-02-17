class Participation < ApplicationRecord
  belongs_to :bill
  belongs_to :member
  validates_presence_of :amount
end
