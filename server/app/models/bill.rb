class Bill < ApplicationRecord
  has_many :participations

  validates_presence_of :title

  def serialize
    {
      title: title,
      added_by: added_by,
      participants: participations.map do |p|
        {
          name: p.member.name,
          amount: p.amount
        }
      end
    }
  end
end
