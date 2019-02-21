class Bill < ApplicationRecord
  has_many :participations
  accepts_nested_attributes_for :participations

  belongs_to :added_by, class_name: 'Member'
  belongs_to :group

  validates_presence_of :title, :added_by, :group

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
