class Bill < ApplicationRecord
  has_many :users
  belongs_to :payer, class_name: 'User'
  belongs_to :added_by, class_name: 'User'
  alias_attribute :participants, :users

  validates :title, :added_by, :amount, presence: true

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

  private

  def bill_params
    params.require(:title, :added_by, :amount, :participants)
  end
end
