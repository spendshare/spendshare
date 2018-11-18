class Bill < ApplicationRecord
  has_many :users
  alias_attribute :participants, :users

  # TODO @tczajecki:
  # add strong parameters

  def serialize
    {
      title: title,
      added_by: added_by,
      amount: amount,
      participants: participants.map { |p| {
        name: p.name,
        email: p.email
      } }
    }
  end
end
