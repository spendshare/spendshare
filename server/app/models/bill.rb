class Bill < ApplicationRecord
  has_many :users
  alias_attribute :participants, :users

  def create
    @bill = Bill.new(bill_params)
  end

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
