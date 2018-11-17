class Bill < ApplicationRecord
  has_many :users
  alias_attribute :participants, :users
end
